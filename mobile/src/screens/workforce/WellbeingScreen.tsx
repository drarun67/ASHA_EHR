import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const WellbeingScreen = () => {
    const [score, setScore] = useState(0);

    const questions = [
        "I feel emotionally exhausted by my work.",
        "I feel I am working too hard at my job.",
        "I feel tired even when I get enough sleep.",
    ];

    const handleAnswer = (val: number) => {
        setScore(score + val);
        Alert.alert("Wellbeing Update", "Your response has been noted. Remember to take small breaks between visits.");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>ASHA Wellbeing Check-in</Text>
                <Text style={styles.cardText}>How are you feeling today? This is private and not shared with PHC.</Text>
            </View>

            {questions.map((q, i) => (
                <View key={i} style={styles.questionCard}>
                    <Text style={styles.questionText}>{q}</Text>
                    <View style={styles.buttonGroup}>
                        {[1, 2, 3, 4, 5].map(val => (
                            <TouchableOpacity key={val} style={styles.circleButton} onPress={() => handleAnswer(val)}>
                                <Text>{val}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}

            <View style={styles.resourceCard}>
                <Text style={styles.resourceTitle}>Stress Management Tools</Text>
                <TouchableOpacity style={styles.toolLink}>
                    <Text style={styles.toolText}>Listen to Guided Relaxation (Hindi)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolLink}>
                    <Text style={styles.toolText}>Contact Peer Support Group</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5', padding: 15 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20 },
    cardTitle: { fontSize: 20, fontWeight: 'bold' },
    cardText: { fontSize: 14, color: '#666', marginTop: 10 },
    questionCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
    questionText: { fontSize: 16, marginBottom: 15 },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-around' },
    circleButton: {
        width: 40, height: 40, borderRadius: 20,
        borderWidth: 1, borderColor: '#ccc',
        justifyContent: 'center', alignItems: 'center'
    },
    resourceCard: { padding: 10 },
    resourceTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    toolLink: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 1 },
    toolText: { color: '#007bff', fontSize: 16 }
});

export default WellbeingScreen;
