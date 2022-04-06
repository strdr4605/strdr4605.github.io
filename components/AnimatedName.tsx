import { useEffect, useRef } from "react";

const sleep = (ms = 250) => new Promise((res) => setTimeout(res, ms));

export default function AnimatedName() {
  const nameRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    async function run() {
      if (!nameRef.current) {
        return;
      }
      await sleep(1500);
      const chars = "Dragoș Străinu".split("");
      chars.splice(6, 1);
      nameRef.current.innerText = chars.join("");
      let i = 5;
      while (i >= 0) {
        let [c] = chars.splice(i, 1);
        chars.splice(chars.length - 5 + i, 0, c);
        await sleep();
      nameRef.current.innerText = chars.join("");
        i--;
      }
      i = 6;
      while (i > 2) {
        chars.splice(i, 1);
        await sleep();
      nameRef.current.innerText = chars.join("");
        i--;
      }
      chars[0] = chars[0].toLowerCase();
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[3] = chars[3].toLowerCase();
      await sleep();
      nameRef.current.innerText = chars.join("");

      chars[5] = chars[5].toUpperCase();
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[6] = chars[6].toUpperCase();
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[7] = chars[7].toUpperCase();
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[8] = chars[8].toUpperCase();
      await sleep();
      nameRef.current.innerText = chars.join("");

      chars[5] = "4";
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[6] = "6";
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[7] = "0";
      await sleep();
      nameRef.current.innerText = chars.join("");
      chars[8] = "5";
      await sleep();
      nameRef.current.innerText = chars.join("");
    }
    run();
  }, []);
  return <span ref={nameRef}>Dragoș Străinu</span>;
}
