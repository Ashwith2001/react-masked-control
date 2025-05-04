const stringCharacterReplacer = (str, replaceCharacter = "*", n = 5) => {
    if (n >= str.length) return replaceCharacter.repeat(str.length);
    return replaceCharacter.repeat(n) + str.slice(n);
}

const concatenateStringBasedOnPositionOfNewlyInputString = (
    orgString,
    enteredString,
    startPos,
    endPos,
    currentInputType
) => {
    const isDelete = currentInputType?.includes("delete");
    const isInsert = currentInputType?.includes("insert");

    // Normalize undefined positions
    startPos = typeof startPos === "number" ? startPos : 0;
    endPos = typeof endPos === "number" ? endPos : startPos;

    if (isDelete) {
        // Case: Delete backward (Backspace), usually startPos === endPos
        if (startPos === endPos && currentInputType === "deleteContentBackward") {
            const deleteIndex = Math.max(startPos - 1, 0);
            return orgString.slice(0, deleteIndex) + orgString.slice(endPos);
        }

        // Case: Delete forward (Delete key), usually startPos === endPos
        if (startPos === endPos && currentInputType === "deleteContentForward") {
            return orgString.slice(0, startPos) + orgString.slice(endPos + 1);
        }

        // Case: Selection delete
        if (startPos !== endPos) {
            return orgString.slice(0, startPos) + orgString.slice(endPos);
        }
    }

    if (isInsert) {
        return orgString.slice(0, startPos) + enteredString + orgString.slice(endPos);
    }
    return orgString;
};


const delimiterProcessor = (string, delimiterCharacter, delimiterBlocks = []) => {
    if (delimiterBlocks.length <= 1) {
        delimiterBlocks = Array.from({ length: string.length }, () => delimiterBlocks[0] ?? 1);
    }

    let result = '';
    let index = 0;

    for (let i = 0; i < delimiterBlocks.length; i++) {
        const blockSize = delimiterBlocks[i];
        result += string.slice(index, index + blockSize);

        index += blockSize;
        if (index <= string.length && i != (delimiterBlocks.length - 1)) {
            result += delimiterCharacter;
        }
    }
    return result;
}

const inputValuePostValidators = (string, props = {}) => {
    let newString = string;
    const { delimiterBlocks, maxLength } = props;
    const totalBlockSize = delimiterBlocks.length > 1 ? delimiterBlocks.reduce((prev, newValue) => prev + newValue, 0) : null;
    if (totalBlockSize) {
        newString = newString.slice(0, totalBlockSize);
    }
    else if (maxLength) {
        newString = newString.slice(0, maxLength);
    }
    return newString;
}

export {
    stringCharacterReplacer,
    concatenateStringBasedOnPositionOfNewlyInputString,
    delimiterProcessor,
    inputValuePostValidators
}