import { useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState([]);
  const [charLength, setCharLength] = useState(10);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setOptions([...options, value]);
    } else {
      setOptions(options.filter(selected => selected != value));
    }
  }

  const copyPassword = () => {
    let copiedPassword = document.getElementById("password");
    copiedPassword.select();
    navigator.clipboard.writeText(copiedPassword.value);
  }

  const generatePassword = () => {
      const characters = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        specialChars: '!@#$%^&*()/',
      }

      let jumbledPassword = '';

      if (options.length == 0) {
        alert("Please select at least one password option");
      }

      if (options.includes('Include Uppercase Letters')) {
        jumbledPassword = characters.uppercase;
      }

      if (options.includes('Include Lowercase Letters')) {
        jumbledPassword += characters.lowercase;
      }

      if (options.includes('Include Numbers')) {
        jumbledPassword += characters.numbers;
      }

      if (options.includes('Include Special Characters')) {
        jumbledPassword += characters.specialChars;
      }

      let returnValue = '';

      for (let x = 0; x < charLength; ++x) {
        returnValue += jumbledPassword.charAt(Math.floor(Math.random() * jumbledPassword.length));
      }

      setPassword(returnValue);
    }

  return (
    <>
        <main>
          <h1>Password Generator</h1>
            <div className="generator-body">
              <div className="password">
                  <label className="hide-label" htmlFor="password">Password</label>
                  <input type="text" name="password" id="password" value={password ? password : ''} 
                    onChange={ (e) => setPassword(e.target.value) } 
                  />
                  <button onClick={copyPassword}>Copy Password</button>
              </div>

              <div className="generator-options">
                                
                <input type="range" min="8" max="15" className="pw-slider" id="pwRange" value={charLength} 
                  onChange={ (e) => setCharLength(e.target.value)}
                />

                <p>Password Length: {charLength} characters</p>

                <div className="generator-options">
                  <div>
                    <input type="checkbox" checked={options.includes('Include Uppercase Letters')} id="uppercase" name ="uppercase" value="Include Uppercase Letters"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="uppercase" className="form-label">Include Uppercase Letters</label>
                  </div>

                  <div>
                    <input type="checkbox" checked={options.includes('Include Lowercase Letters')} id="lowercase" name="lowercase" value="Include Lowercase Letters"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="lowercase" className="form-label">Include Lowercase Letters</label>
                  </div>

                  <div>
                    <input type="checkbox" checked={options.includes('Include Numbers')}  id="numbers" value="Include Numbers"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="numbers" className="form-label">Include Numbers</label>
                  </div>

                  <div>
                    <input type="checkbox" checked={options.includes('Include Special Characters')} id="special-characters" value="Include Special Characters"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="special-characters" className="form-label">Include Special Characters</label>
                  </div>
                  
                  <button onClick={generatePassword} className="fw-btn" type="submit">Generate Password</button>
              </div>
              </div>
            </div>
        </main>
    </>
  )
}

export default App
