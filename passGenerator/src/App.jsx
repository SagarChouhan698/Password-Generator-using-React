import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!~`@#$%^&*()-";
    }
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className="w-full max-w-md rounded-lg shadow-md mx-auto my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-2xl p-3 text-center">
          Password Generator
        </h1>
        <div className="w-full my-3 text-center flex ">
          <input
            className="w-full bg-white px-3 py-2 text-lg rounded-lg outline-none rounded-br-none rounded-tr-none"
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          className="text-white bg-blue-500 p-2 rounded-lg rounded-bl-none rounded-tl-none"
          onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(evt) => setLength(evt.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
