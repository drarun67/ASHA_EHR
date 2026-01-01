import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import Patient from '../../models/Patient';
import { Q } from '@nozbe/watermelondb';

const PatientListScreen = ({ route, navigation }: any) => {
    const { familyId } = route.params || {};
    const database = useDatabase();
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const patientCollection = database.get<Patient>('patients');
            let query = patientCollection.query();

            if (familyId) {
                query = patientCollection.query(Q.where('family_id', familyId));
            }

            const allPatients = await query.fetch();
            setPatients(allPatients);
        };

        fetchPatients();
    }, [database, familyId]);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PatientDetails', { patientId: item.id })}
        >
            <View>
                <Text style={styles.title}>{item.fullName}</Text>
                <Text style={styles.subtitle}>ABHA ID: {item.abhaId || 'Not Linked'}</Text>
                <Text style={styles.meta}>Gender: {item.gender} | Age: {item.dob}</Text>
            </View>
            <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Patient Registry</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddPatient', { familyId })}
                >
                    <Text style={styles.addButtonText}>+ New Patient</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={patients}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No patients found.</Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: {
        padding: 20,
        backgroundColor: '#28a745',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    addButton: { backgroundColor: '#fff', padding: 8, borderRadius: 5 },
    addButtonText: { color: '#28a745', fontWeight: 'bold' },
    listContent: { padding: 15 },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    subtitle: { color: '#007bff', marginTop: 4, fontWeight: '500' },
    meta: { color: '#666', marginTop: 2, fontSize: 12 },
    arrow: { fontSize: 20, color: '#ccc' },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});

export default PatientListScreen;
