import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import ANCRecord from '../../models/ANCRecord';

const AddANCScreen = ({ route, navigation }: any) => {
    const { patientId } = route.params || {};
    const database = useDatabase();

    const [lmpDate, setLmpDate] = useState('');
    const [parity, setParity] = useState('');
    const [gravidity, setGravidity] = useState('');

    const calculateEDD = (lmp: string) => {
        // Basic logic: LMP + 280 days
        // In a real app, use date-fns or similar
        return "Calculated EDD";
    };

    const handleSave = async () => {
        if (!lmpDate) {
            Alert.alert('Validation Error', 'LMP Date is mandatory.');
            return;
        }

        try {
            await database.write(async () => {
                await database.get<ANCRecord>('anc_records').create(anc => {
                    anc.patientId = patientId;
                    anc.lmpDate = new Date(); // Convert lmpDate string to Date
                    anc.eddDate = new Date(); // Calculate and convert EDD
                    anc.parity = parseInt(parity) || 0;
                    anc.gravidity = parseInt(gravidity) || 0;
                });
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save ANC record.');
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>LMP Date (DD-MM-YYYY) *</Text>
                <TextInput
                    style={styles.input}
                    value={lmpDate}
                    onChangeText={setLmpDate}
                    placeholder="e.g. 01-01-2024"
                />

                <Text style={styles.label}>Parity</Text>
                <TextInput
                    style={styles.input}
                    value={parity}
                    onChangeText={setParity}
                    placeholder="Number of previous births"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Gravidity</Text>
                <TextInput
                    style={styles.input}
                    value={gravidity}
                    onChangeText={setGravidity}
                    placeholder="Number of pregnancies"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Schedule ANC Plan</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    form: { padding: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddANCScreen;
