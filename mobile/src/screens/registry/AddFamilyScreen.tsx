import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import Family from '../../models/Family';

const AddFamilyScreen = ({ navigation }: any) => {
    const database = useDatabase();
    const [headName, setHeadName] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [villageId, setVillageId] = useState('');
    const [rationCardNo, setRationCardNo] = useState('');

    const handleSave = async () => {
        if (!headName || !houseNo || !villageId) {
            Alert.alert('Validation Error', 'Please fill in all mandatory fields.');
            return;
        }

        try {
            await database.write(async () => {
                await database.get<Family>('families').create(family => {
                    family.headName = headName;
                    family.houseNo = houseNo;
                    family.villageId = villageId;
                    family.rationCardNo = rationCardNo;
                });
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save family record.');
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Head of Family Name *</Text>
                <TextInput
                    style={styles.input}
                    value={headName}
                    onChangeText={setHeadName}
                    placeholder="Enter name"
                />

                <Text style={styles.label}>House Number *</Text>
                <TextInput
                    style={styles.input}
                    value={houseNo}
                    onChangeText={setHouseNo}
                    placeholder="e.g. 123/A"
                />

                <Text style={styles.label}>Village ID *</Text>
                <TextInput
                    style={styles.input}
                    value={villageId}
                    onChangeText={setVillageId}
                    placeholder="Enter Village ID"
                />

                <Text style={styles.label}>Ration Card Number</Text>
                <TextInput
                    style={styles.input}
                    value={rationCardNo}
                    onChangeText={setRationCardNo}
                    placeholder="Optional"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Family Record</Text>
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
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddFamilyScreen;
