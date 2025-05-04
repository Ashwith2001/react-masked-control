const updateInputCursorPosition = (target, newlyAddedString, startPos) => {
    const newCursorPosition = startPos + (newlyAddedString?.length ?? 0)
    target.setSelectionRange(newCursorPosition, newCursorPosition);
}

export {
    updateInputCursorPosition
}