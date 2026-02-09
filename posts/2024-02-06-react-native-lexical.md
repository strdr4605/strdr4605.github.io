---
title: "How to set up Lexical editor in React Native"
date: 2024-02-21
slug: how-to-set-up-lexical-editor-in-react-native
starred: true
description: We will look at how to build a rich text editor in React Native using lexical editor, with the help of react-native-webview.
tags:
  - react-native
---

So you have a web app that uses Lexical editor and now you want to build the same editor on React Native, or maybe you just want to build a rich text editor in React Native using Lexical.
But unfortunately lexical does not [support React Native](https://github.com/facebook/lexical/discussions/2410) at the moment.

So the idea that comes to mind is to try Lexical editor in a react-native-webview. There are similar solutions like [react-native-cn-quill](https://github.com/imnapo/react-native-cn-quill) and [react-native-rich-editor](https://github.com/wxik/react-native-rich-editor).

But as [expo docs](https://docs.expo.dev/guides/editing-richtext/#custom-webview-based-editor) say:

> If you need more configurability, you can build a similar library with an existing web-only editor.

So let's implement a lexical editor in an Expo app.  
(This is a demo project but you can follow the steps to add the editor to an existing React Native app)

## Create the expo app

```bash
npx create-expo-app -t expo-template-blank-typescript
```

Now let's install `react-native-webview`.

```bash
npm i react-native-webview
```

And make some changes in `App.tsx`, to display the WebView with https://playground.lexical.dev/ (for now).

```tsx
// ./App.tsx
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "80%" }}>
        <Text>Lexical Webview</Text>
        <WebView
          source={{ uri: "https://playground.lexical.dev" }}
          style={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

We should have this result:

![expo-webview-init](/expo-webview-init.png#small)

## Add lexical editor

Other implementations for a rich text editor in react-native give us a predefined editor. However, we want to create our custom lexical editor with custom nodes and logic. So the only option is to create the editor from scratch.  
How? By creating a new app inside the project using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

We add a workspace to `package.json`:

```json
  "name": "react-native-lexical",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "workspaces": [ // [!code ++]
    "lexical-editor" // [!code ++]
  ], // [!code ++]
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
```

> We can name it how we want `post-editor`, `page-editor`. Also we can have multiple editors if needed.

### Create web app as npm workspace

For this, we will use [vite](https://vitejs.dev/).

```bash
npm create vite@latest lexical-editor -- --template react-ts
```

Let's do a cleanup and some changes in lexical-editor app.

```bash
lexical-editor
├── README.md
├── index.html
├── package.json
├── src
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Important to not enable zoom in the WebView, add this to `index.html`:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0"
/>
```

Now we can run the web app:

```bash
# in the root of expo app, we run script from lexical-editor workspace
npm --workspace=lexical-editor run dev
```

And we can see this in the browser:

![lexical-vite-init](/lexical-vite-init.png)

Cool, now how can we put this into `react-native-webview`?!

### Build a web app for react-native-webview

For this, we need some vite plugins that will build the app into a single file that we will import into react-native-webview.

```bash
npm -w=lexical-editor i -D vite-plugin-singlefile
```

and let's change the `vite.config.ts`:

```ts
// .lexical-editor/vite.config.ts
import fs from "fs";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    watch: {
      include: ["src/**"],
      buildDelay: 500,
    },
  },
  plugins: [
    react(),
    viteSingleFile(),
    {
      name: "vite-plugin-html-string",
      closeBundle() {
        const bundle = fs.readFileSync("dist/index.html", "utf8");

        const escaped = JSON.stringify(bundle);
        const js = `export default ${escaped}`;

        fs.writeFileSync("dist/htmlString.ts", js);
      },
    },
  ],
});
```

This config watches for changes and builds the app into a single `index.html` file that we next write into a file named `htmlString.ts` so we can import it into react-native.

Now we can run:

```bash
npm -w=lexical-editor run build
```

And vite will build the web editor on every change.

Also, we need to build the app on install:

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "prepare": "npm run build -- --no-watch", // [!code ++]
```

Only now we can import the output of the web app into react-native-webview:

```tsx
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import htmlString from "./lexical-editor/dist/htmlString"; // [!code ++]

export default function App() {
  return (
        <Text>Lexical Webview</Text>
        <WebView
          originWhitelist={["*"]}
          source={{ uri: "https://playground.lexical.dev" }} // [!code --]
          source={{ html: htmlString }} // [!code ++]
          style={{ marginTop: 20 }}
        />
      </View>
```

![lexical-vite-webview](/lexical-vite-webview.png#small)

## Create a basic lexical editor

Following https://lexical.dev/docs/getting-started/react

```bash
npm -w=lexical-editor install --save lexical @lexical/react
```

We can create a basic lexical editor:

```tsx
// lexical-editor/src/Editor.tsx
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import "./Editor.css";

function onError(error: unknown) {
  console.error(error);
}

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={
            <div className="editor-placeholder">Enter some text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}
```

![basic-lexical-editor](basic-lexical-editor.gif#small)

## Message from WebView to React Native

Let's add the `OnChangePlugin` and post a message to react-native:

```tsx
import { $getRoot, EditorState } from "lexical"; // [!code ++]
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"; // [!code ++]
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import "./Editor.css";

// ...
    onError,
  };

  function onChange(editorState: EditorState) { // [!code ++]
    editorState.read(() => { // [!code ++]
      const plainText = $getRoot().getTextContent(); // [!code ++]
 // [!code ++]
      const message = { // [!code ++]
        type: "LEXICAL_EDITOR_STATE_CHANGE", // [!code ++]
        payload: { // [!code ++]
          plainText, // [!code ++]
          serializedEditorState: editorState.toJSON(), // [!code ++]
        }, // [!code ++]
      }; // [!code ++]
 // [!code ++]
      window.ReactNativeWebView?.postMessage(JSON.stringify(message)); // [!code ++]
    }); // [!code ++]
  } // [!code ++]
 // [!code ++]
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
// ...
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} /> // [!code ++]
      </div>
    </LexicalComposer>
  );
```

Ok, now we can receive this message on the react-native side:

```tsx
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview"; // [!code --]
import WebView, { WebViewMessageEvent } from "react-native-webview"; // [!code ++]
import htmlString from "./lexical-editor/dist/htmlString";

export default function App() {
  function onMessage(event: WebViewMessageEvent) { // [!code ++]
    const message = JSON.parse(event.nativeEvent.data); // [!code ++]
    console.log(JSON.stringify(message, null, 2)); // [!code ++]
  } // [!code ++]
 // [!code ++]
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "80%" }}>
        <Text>Lexical Webview</Text>
        <WebView
          originWhitelist={["*"]}
          onMessage={onMessage} // [!code ++]
          source={{ html: htmlString }}
          style={{ marginTop: 20 }}
        />
```

When we type something in the WebView editor we receive:

```json
{
  "type": "LEXICAL_EDITOR_STATE_CHANGE",
  "payload": {
    "plainText": "Hi",
    "serializedEditorState": {
      "root": {
        "children": [
          {
            "children": [
              {
                "detail": 0,
                "format": 0,
                "mode": "normal",
                "style": "",
                "text": "Hi",
                "type": "text",
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "type": "paragraph",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "root",
        "version": 1
      }
    }
  }
}
```

We can do a switch on `message.type` and handle any messages:

```ts
function onMessage(event: WebViewMessageEvent) {
  const message = JSON.parse(event.nativeEvent.data);
  console.log(JSON.stringify(message, null, 2));

  switch (message.type) {
    case "LEXICAL_EDITOR_STATE_CHANGE":
      // Do something with the editor state
      // like saving it to a database
      break;
    default:
      console.error("Unknown message type", message);
  }
}
```

## Command from React Native to Webview

Let's say, we want to initialize the editor state when it is mounted.

We listen for `LEXICAL_EDITOR_READY` message and post a message to webview using WebView ref.

```tsx
...
import { useRef } from "react"; // [!code ++]

export default function App() {
  const webviewRef = useRef<WebView>(null); // [!code ++]
 // [!code ++]
  function onMessage(event: WebViewMessageEvent) {
    const message = JSON.parse(event.nativeEvent.data);
    console.log(JSON.stringify(message, null, 2));
    ...
        // Do something with the editor state
        // like saving it to a database
        break;
      case "LEXICAL_EDITOR_READY": // [!code ++]
        const commandMessage = { // [!code ++]
          command: "INIT_SERIALIZED_EDITOR_STATE", // [!code ++]
          payload: { // [!code ++]
            root: { // [!code ++]
              children: [ // [!code ++]
                { // [!code ++]
                  children: [ // [!code ++]
                    { // [!code ++]
                      detail: 0, // [!code ++]
                      format: 0, // [!code ++]
                      mode: "normal", // [!code ++]
                      style: "", // [!code ++]
                      text: "Initial text", // [!code ++]
                      type: "text", // [!code ++]
                      version: 1, // [!code ++]
                    }, // [!code ++]
                  ], // [!code ++]
                  direction: "ltr", // [!code ++]
                  format: "", // [!code ++]
                  indent: 0, // [!code ++]
                  type: "paragraph", // [!code ++]
                  version: 1, // [!code ++]
                }, // [!code ++]
              ], // [!code ++]
              direction: "ltr", // [!code ++]
              format: "", // [!code ++]
              indent: 0, // [!code ++]
              type: "root", // [!code ++]
              version: 1, // [!code ++]
            }, // [!code ++]
          }, // [!code ++]
        }; // [!code ++]
 // [!code ++]
        webviewRef.current?.postMessage(JSON.stringify(commandMessage)); // [!code ++]
        break; // [!code ++]
      default:
        console.error("Unknown message type", message);
    }
      <View style={{ width: "100%", height: "80%" }}>
        <Text>Lexical Webview</Text>
        <WebView
          ref={webviewRef} // [!code ++]
          originWhitelist={["*"]}
          onMessage={onMessage}
          source={{ html: htmlString }}
```

Now we need to handle this in Lexical editor. We can create a custom plugin.

```tsx
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const EditorStateInitPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const message = {
      type: "LEXICAL_EDITOR_READY",
    };

    window.ReactNativeWebView?.postMessage(JSON.stringify(message));
  }, []);

  useEffect(() => {
    const listener = (e: MessageEvent<string>) => {
      const message = JSON.parse(e.data);

      if (message.command === "INIT_SERIALIZED_EDITOR_STATE") {
        editor.setEditorState(editor.parseEditorState(message.payload), {
          tag: "FromReactNativeToLexical",
        });
      }
    };
    window.addEventListener("message", listener);

    return () => {
      window.removeEventListener("message", listener);
    };
  }, [editor]);

  return null;
};
```

And use it in our `Editor.tsx`:

```tsx
import { $getRoot, EditorState } from "lexical"; // [!code --]
import { $getRoot, EditorState, LexicalEditor } from "lexical"; // [!code ++]
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EditorStateInitPlugin } from "./plugins/EditorStateInitPlugin"; // [!code ++]
import "./Editor.css";

...

  function onChange(editorState: EditorState) { // [!code --]
  function onChange( // [!code ++]
    editorState: EditorState, // [!code ++]
    _latestEditor: LexicalEditor, // [!code ++]
    tags: Set<string>, // [!code ++]
  ) { // [!code ++]
    if (tags.has("FromReactNativeToLexical")) { // [!code ++]
      return; // [!code ++]
    } // [!code ++]
    editorState.read(() => {
      const plainText = $getRoot().getTextContent();

...

          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <EditorStateInitPlugin /> // [!code ++]
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
```

Let's see it in action:

![lexical-initial-state](lexical-initial-state.gif#small)

## What's next?

Now you can add the desired nodes and plugins into editor. Also, add new messages and commands for communication between React Native and Lexical editor in WebView.

For the full code example, you can check the playground project on GitHub, [react-native-lexical](https://github.com/Planable/react-native-lexical).
