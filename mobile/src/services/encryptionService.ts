import * as Keychain from 'react-native-keychain';
import NetInfo from "@react-native-community/netinfo";
import { Buffer } from 'buffer';

const DB_KEY_ALIAS = 'asha_ehr_db_key';

export const getDatabaseEncryptionKey = async (): Promise<string> => {
    try {
        // Check if key exists in hardware-backed keystore
        const credentials = await Keychain.getGenericPassword({ service: DB_KEY_ALIAS });

        if (credentials) {
            return credentials.password;
        }

        // Generate a new secure key if it doesn't exist
        const newKey = Buffer.from(Math.random().toString() + Date.now().toString()).toString('hex');

        await Keychain.setGenericPassword('admin', newKey, {
            service: DB_KEY_ALIAS,
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });

        return newKey;
    } catch (error) {
        console.error('Failed to get/generate DB encryption key:', error);
        throw error;
    }
};
