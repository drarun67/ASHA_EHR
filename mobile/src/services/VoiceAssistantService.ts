import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { useState, useCallback } from 'react';

export const useVoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const startListening = async () => {
        try {
            setResults([]);
            setError(null);
            await Voice.start('en-IN'); // Support for Indian accent English / Hindi
            setIsListening(true);
        } catch (e) {
            setError(String(e));
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (e) {
            setError(String(e));
        }
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        if (e.value) setResults(e.value);
    };

    Voice.onSpeechError = (e) => {
        setError(String(e.error));
        setIsListening(false);
    };

    return {
        isListening,
        results,
        error,
        startListening,
        stopListening,
    };
};
