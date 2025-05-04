import React, { useEffect, useRef, useState } from "react"
import { concatenateStringBasedOnPositionOfNewlyInputString, delimiterProcessor, inputValuePostValidators, stringCharacterReplacer } from "./helpers/maskingProcessor";
import { updateInputCursorPosition } from "./helpers/shared";

export const ReactMaskedControl = ({
    replaceCharacter = null,
    replaceCharacterLength = null,
    delimiterBlocks = [],
    delimiterCharacter = null,
    onChange = () => { },
    nativeInputProps = {},
    value = "",
    maxLength = null
}) => {

    const inputRef = useRef(null);

    const [orgInputValue, setOrgInputValue] = useState("");
    const [maskedInputValue, setMaskedInputValue] = useState("");

    const [selectionStart, setSelectionStart] = useState(1);
    const [selectionEnd, setSelectionEnd] = useState(1);
    const [currentEnteredData, setCurrentEnteredData] = useState("");
    const [currentInputType, setCurrentInputType] = useState("");

    const stringProcessor = (string) => {
        if (!string) return string;

        let resultantString = string;

        // String Character Resplacer
        if (replaceCharacter && replaceCharacter?.trim()) {
            resultantString = stringCharacterReplacer(resultantString, replaceCharacter, replaceCharacterLength ?? resultantString?.length);
        }

        // Delimiter Processor
        if (delimiterCharacter) {
            resultantString = delimiterProcessor(resultantString, delimiterCharacter, delimiterBlocks);
        }

        return resultantString;
    }

    const onChangeHandler = (e) => {
        let finalInputValue = concatenateStringBasedOnPositionOfNewlyInputString(orgInputValue, currentEnteredData, selectionStart, selectionEnd, currentInputType);
        finalInputValue = inputValuePostValidators(finalInputValue, { delimiterBlocks, maxLength });
        const maskedValue = stringProcessor(finalInputValue);
        setMaskedInputValue(maskedValue);
        setOrgInputValue(finalInputValue);

        if (onChange) {
            onChange(e, maskedValue, finalInputValue);
        }
    }

    const selectionHandler = (start, end) => {
        let prev = 0;
        const sumBlock = delimiterBlocks.map((b, indx) => {
            if (indx != 0) ++prev;
            prev = b + prev;
            return prev;
        });
        const totalDelimiters = sumBlock.filter(x => x < start).length;
        if (totalDelimiters) {
            return { start: start - totalDelimiters, end: end - totalDelimiters }
        }
        return { start, end }
    }

    const onBeforeInputHandler = (e) => {
        const input = inputRef.current;
        const { start, end } = selectionHandler(input.selectionStart, input.selectionEnd);
        setSelectionStart(start);
        setSelectionEnd(end);
        setCurrentEnteredData(e.data);
        setCurrentInputType(e.inputType);
    };

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.addEventListener("beforeinput", onBeforeInputHandler);
        }

        return () => {
            if (input) {
                input.removeEventListener("beforeinput", onBeforeInputHandler);
            }
        };
    }, []);

    useEffect(() => {
        if (inputRef && !delimiterCharacter) {
            updateInputCursorPosition(inputRef.current, currentEnteredData, selectionStart);
        }
    }, [orgInputValue]);

    useEffect(() => {
        const changedValue = inputValuePostValidators(value, { delimiterBlocks, maxLength });
        const maskedValue = stringProcessor(changedValue);
        setOrgInputValue(changedValue);
        setMaskedInputValue(maskedValue);
    }, [value]);

    return <>
        <input
            ref={inputRef}
            className="form-control"
            {...nativeInputProps}
            type={"text"}
            value={maskedInputValue}
            onChange={onChangeHandler}
        />
    </>
}