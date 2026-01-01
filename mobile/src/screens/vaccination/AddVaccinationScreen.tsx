import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import VaccinationRecord from '../../models/VaccinationRecord';

const AddVaccinationScreen = ({ route, navigation }: any) => {
    const { patientId } = route.params || {};
    const database = useDatabase();

    const [vaccineCode, setVaccineCode] = useState('');
    const [dateAdministered, setDateAdministered] = useState('');

    const handleSave = async () => {
        if (!vaccineCode || !dateAdministered) {
            Alert.alert('Validation Error', 'Vaccine and Date are mandatory.');
            return;
        }

        try {
            await database.write(async () => {
                await database.get<VaccinationRecord>('vaccination_records').create(vax => {
                    vax.patientId = patientId;
                    vax.vaccineCode = vaccineCode;
                    vax.dateAdministered = new Date(); // Convert string to Date
                    vax.administeredBy = 'ASHA';
                });
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save vaccination record.');
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Select Vaccine *</Text>
                <TextInput
                    style={styles.input}
                    value={vaccineCode}
                    onChangeText={setVaccineCode}
                    placeholder="e.g. BCG, OPV-0, Hepatitis B"
                />

                <Text style={styles.label}>Date Administered (DD-MM-YYYY) *</Text>
                <TextInput
                    style={styles.input}
                    value={dateAdministered}
                    onChangeText={setDateAdministered}
                    placeholder="e.g. 28-12-2023"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Record Vaccination</Text>
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
        backgroundColor: '#ffc107',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    saveButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' }
});

export default AddVaccinationScreen;
