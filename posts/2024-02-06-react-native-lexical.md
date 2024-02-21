---
title: "How to setup Lexical editor in React Native"
date: 2024-02-06
description: We will look at how to build a rich text editor in React Native using lexical editor, with the help of react-native-webview.
tags:
  - react-native
draft: true
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

![expo-webview-init](expo-webview-init.png#small)

## Add lexical editor

Other implementations for a rich text editor in react-native give us a predefined editor. However, we want to create our custom lexical editor with custom nodes and logic. So the only option is to create the editor from scratch.  
How? By creating a new app inside the project using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

We add a workspace to `package.json`:

```diff-json[class="diff-highlight"]
   "name": "react-native-lexical",
   "version": "1.0.0",
   "main": "node_modules/expo/AppEntry.js",
+  "workspaces": [
+    "lexical-editor"
+  ],
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

![lexical-vite-init](lexical-vite-init.png)

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
Also, we need to build the app on install:

```diff-json[class="diff-highlight"]
   "scripts": {
     "dev": "vite",
     "build": "tsc && vite build",
+    "prepare": "npm run build -- --no-watch",
```

Only now we can import the output of the web app into react-native-webview:

```diff-tsx[class="diff-highlight"]
 import { StyleSheet, Text, View } from "react-native";
 import WebView from "react-native-webview";
+import htmlString from "./lexical-editor/dist/htmlString";

 export default function App() {
   return (
         <Text>Lexical Webview</Text>
         <WebView
           originWhitelist={["*"]}
-          source={{ uri: "https://playground.lexical.dev" }}
+          source={{ html: htmlString }}
           style={{ marginTop: 20 }}
         />
       </View>
```

![lexical-vite-webview](lexical-vite-webview.png#small)

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

```diff-tsx[class="diff-highlight"]
+import { $getRoot, EditorState } from "lexical";
 import { LexicalComposer } from "@lexical/react/LexicalComposer";
 import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
 import { ContentEditable } from "@lexical/react/LexicalContentEditable";
 import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
+import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
 import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
 import "./Editor.css";

@@ -15,6 +17,22 @@ export function Editor() {
     onError,
   };

+  function onChange(editorState: EditorState) {
+    editorState.read(() => {
+      const plainText = $getRoot().getTextContent();
+
+      const message = {
+        type: "LEXICAL_EDITOR_STATE_CHANGE",
+        payload: {
+          plainText,
+          serializedEditorState: editorState.toJSON(),
+        },
+      };
+
+      window.ReactNativeWebView?.postMessage(JSON.stringify(message));
+    });
+  }
+
   return (
     <LexicalComposer initialConfig={initialConfig}>
       <div className="editor-container">
@@ -26,6 +44,7 @@ export function Editor() {
           ErrorBoundary={LexicalErrorBoundary}
         />
         <HistoryPlugin />
+        <OnChangePlugin onChange={onChange} />
       </div>
     </LexicalComposer>
   );
```

Ok, now we can receive this message on the react-native side:

```diff-tsx[class="diff-highlight"]
 import { StyleSheet, Text, View } from "react-native";
-import WebView from "react-native-webview";
+import WebView, { WebViewMessageEvent } from "react-native-webview";
 import htmlString from "./lexical-editor/dist/htmlString";

 export default function App() {
+  function onMessage(event: WebViewMessageEvent) {
+    const message = JSON.parse(event.nativeEvent.data);
+    console.log(JSON.stringify(message, null, 2));
+  }
+
   return (
     <View style={styles.container}>
       <View style={{ width: "100%", height: "80%" }}>
         <Text>Lexical Webview</Text>
         <WebView
           originWhitelist={["*"]}
+          onMessage={onMessage}
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

```diff-tsx[class="diff-highlight"]
...
+import { useRef } from "react";

 export default function App() {
+  const webviewRef = useRef<WebView>(null);
+
   function onMessage(event: WebViewMessageEvent) {
     const message = JSON.parse(event.nativeEvent.data);
     console.log(JSON.stringify(message, null, 2));
     ...
         // Do something with the editor state
         // like saving it to a database
         break;
+      case "LEXICAL_EDITOR_READY":
+        const commandMessage = {
+          command: "INIT_SERIALIZED_EDITOR_STATE",
+          payload: {
+            root: {
+              children: [
+                {
+                  children: [
+                    {
+                      detail: 0,
+                      format: 0,
+                      mode: "normal",
+                      style: "",
+                      text: "Initial text",
+                      type: "text",
+                      version: 1,
+                    },
+                  ],
+                  direction: "ltr",
+                  format: "",
+                  indent: 0,
+                  type: "paragraph",
+                  version: 1,
+                },
+              ],
+              direction: "ltr",
+              format: "",
+              indent: 0,
+              type: "root",
+              version: 1,
+            },
+          },
+        };
+
+        webviewRef.current?.postMessage(JSON.stringify(commandMessage));
+        break;
       default:
         console.error("Unknown message type", message);
     }
       <View style={{ width: "100%", height: "80%" }}>
         <Text>Lexical Webview</Text>
         <WebView
+          ref={webviewRef}
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

```diff-tsx[class="diff-highlight"]
-import { $getRoot, EditorState } from "lexical";
+import { $getRoot, EditorState, LexicalEditor } from "lexical";
 import { LexicalComposer } from "@lexical/react/LexicalComposer";
 import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
 import { ContentEditable } from "@lexical/react/LexicalContentEditable";
 import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
 import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
 import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
+import { EditorStateInitPlugin } from "./plugins/EditorStateInitPlugin";
 import "./Editor.css";

 function onError(error: unknown) {
@@ -17,7 +18,14 @@ export function Editor() {
     onError,
   };

-  function onChange(editorState: EditorState) {
+  function onChange(
+    editorState: EditorState,
+    _latestEditor: LexicalEditor,
+    tags: Set<string>,
+  ) {
+    if (tags.has("FromReactNativeToLexical")) {
+      return;
+    }
     editorState.read(() => {
       const plainText = $getRoot().getTextContent();

@@ -44,6 +52,7 @@ export function Editor() {
           ErrorBoundary={LexicalErrorBoundary}
         />
         <HistoryPlugin />
+        <EditorStateInitPlugin />
         <OnChangePlugin onChange={onChange} />
       </div>
     </LexicalComposer>
```

Now let's see it in action:

![lexical-initial-state](lexical-initial-state.gif#small)
