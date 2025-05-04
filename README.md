
---

# ReactMaskedControl

`ReactMaskedControl` is a flexible and customizable masked input component for React. It supports string masking with optional delimiters, character replacement, and full control over cursor behavior and input formatting.

## ✨ Features

- Dynamic masking and formatting
- Custom delimiters and delimiter blocks
- Character replacement support
- Full control over raw vs. masked values
- Lightweight and dependency-free

## 📦 Installation

```bash
npm install react-masked-control
````

Or with Yarn:

```bash
yarn add react-masked-control
```

## 🚀 Usage

```jsx
import React, { useState } from 'react';
import { ReactMaskedControl } from 'react-masked-control';

export default function App() {
  const [value, setValue] = useState("");

  return (
    <ReactMaskedControl
      delimiterCharacter="-"
      delimiterBlocks={[3, 3, 4]}
      replaceCharacter="*"
      replaceCharacterLength={4}
      value={value}
      onChange={(e, maskedValue, rawValue) => setValue(rawValue)}
      nativeInputProps={{ placeholder: "Enter masked input" }}
    />
  );
}
```

## ⚙️ Props

| Prop                     | Type       | Default    | Description                                                         |
| ------------------------ | ---------- | ---------- | ------------------------------------------------------------------- |
| `value`                  | `string`   | `""`       | Raw input value (unmasked).                                         |
| `onChange`               | `func`     | `() => {}` | Callback with `(event, maskedValue, rawValue)`                      |
| `replaceCharacter`       | `string`   | `null`     | Character to replace input characters with (e.g., `*` for masking). |
| `replaceCharacterLength` | `number`   | `null`     | Number of characters to mask with `replaceCharacter`.               |
| `delimiterBlocks`        | `number[]` | `[]`       | Blocks for delimiter insertion (e.g., `[3,3,4]` for phone number).  |
| `delimiterCharacter`     | `string`   | `null`     | Character to use as delimiter (e.g., `-`).                          |
| `maxLength`              | `number`   | `null`     | Max allowed length of raw input.                                    |
| `nativeInputProps`       | `object`   | `{}`       | Props to pass to the underlying `<input>` element.                  |


## 📄 License

MIT

