import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import Patient from '../../models/Patient';

const AddPatientScreen = ({ route, navigation }: any) => {
    const { familyId } = route.params || {};
    const database = useDatabase();

    const [fullName, setFullName] = useState('');
    const [abhaId, setAbhaId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [gender, setGender] = useState('Female');
    const [dob, setDob] = useState('');

    const handleSave = async () => {
        if (!fullName || !dob) {
            Alert.alert('Validation Error', 'Full Name and DOB are mandatory.');
            return;
        }

        try {
            await database.write(async () => {
                await database.get<Patient>('patients').create(patient => {
                    patient.familyId = familyId || '';
                    patient.fullName = fullName;
                    patient.abhaId = abhaId;
                    patient.mobileNo = mobileNo;
                    patient.gender = gender;
                    patient.dob = dob;
                });
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save patient record.');
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter patient name"
                />

                <Text style={styles.label}>ABHA ID (14 digits)</Text>
                <TextInput
                    style={styles.input}
                    value={abhaId}
                    onChangeText={setAbhaId}
                    placeholder="Optional"
                    keyboardType="numeric"
                    maxLength={14}
                />

                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                    style={styles.input}
                    value={mobileNo}
                    onChangeText={setMobileNo}
                    placeholder="Optional"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Date of Birth (DD-MM-YYYY) *</Text>
                <TextInput
                    style={styles.input}
                    value={dob}
                    onChangeText={setDob}
                    placeholder="e.g. 15-08-1990"
                />

                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderRow}>
                    {['Male', 'Female', 'Other'].map(g => (
                        <TouchableOpacity
                            key={g}
                            style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                            onPress={() => setGender(g)}
                        >
                            <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Register Patient</Text>
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
    genderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    genderBtn: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center'
    },
    genderBtnActive: { backgroundColor: '#28a745', borderColor: '#28a745' },
    genderText: { color: '#666', fontWeight: 'bold' },
    genderTextActive: { color: '#fff' },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddPatientScreen;
