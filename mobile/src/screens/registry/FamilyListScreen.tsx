import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import Family from '../../models/Family';

const FamilyListScreen = ({ navigation }: any) => {
    const database = useDatabase();
    const [families, setFamilies] = useState<Family[]>([]);

    useEffect(() => {
        const fetchFamilies = async () => {
            const familyCollection = database.get<Family>('families');
            const allFamilies = await familyCollection.query().fetch();
            setFamilies(allFamilies);
        };

        fetchFamilies();
    }, [database]);

    const renderItem = ({ item }: { item: Family }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FamilyDetails', { familyId: item.id })}
        >
            <View>
                <Text style={styles.title}>{item.headName}</Text>
                <Text style={styles.subtitle}>House No: {item.houseNo}</Text>
            </View>
            <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Family Registry</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddFamily')}
                >
                    <Text style={styles.addButtonText}>+ Add Family</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={families}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No families registered in this village yet.</Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: {
        padding: 20,
        backgroundColor: '#007bff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    addButton: { backgroundColor: '#fff', padding: 8, borderRadius: 5 },
    addButtonText: { color: '#007bff', fontWeight: 'bold' },
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
    subtitle: { color: '#666', marginTop: 4 },
    arrow: { fontSize: 20, color: '#ccc' },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});

export default FamilyListScreen;
