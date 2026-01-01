import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BACKEND_URL = 'http://10.0.2.2:8000';

const DashboardScreen = () => {
    const [stats, setStats] = useState<any>(null);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const statsRes = await axios.get(`${BACKEND_URL}/dashboard/stats`);
                const alertsRes = await axios.get(`${BACKEND_URL}/dashboard/alerts`);
                setStats(statsRes.data);
                setAlerts(alertsRes.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>PHC Supervisor Dashboard</Text>
                <Text style={styles.subtitle}>Block: Nuh | Primary Health Centre</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats?.total_patients || 0}</Text>
                    <Text style={styles.statLabel}>Total Patients</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#fff3cd' }]}>
                    <Text style={[styles.statValue, { color: '#856404' }]}>{stats?.high_risk_cases || 0}</Text>
                    <Text style={styles.statLabel}>High Risk Cases</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Critical Alerts</Text>
            {alerts.map(alert => (
                <View key={alert.id} style={[styles.alertCard, alert.severity === 'CRITICAL' ? styles.criticalBorder : styles.warningBorder]}>
                    <Text style={styles.alertType}>{alert.type}</Text>
                    <Text style={styles.alertMessage}>{alert.message}</Text>
                </View>
            ))}

            <TouchableOpacity style={styles.refreshButton}>
                <Text style={styles.refreshText}>Refresh Data</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { padding: 20, backgroundColor: '#007bff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    subtitle: { fontSize: 14, color: '#e0e0e0', marginTop: 5 },
    statsContainer: { flexDirection: 'row', padding: 15, justifyContent: 'space-between' },
    statCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '48%',
        alignItems: 'center',
        elevation: 2
    },
    statValue: { fontSize: 32, fontWeight: 'bold', color: '#333' },
    statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', margin: 20, color: '#333' },
    alertCard: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 15, padding: 15, borderRadius: 8, borderWidth: 1 },
    criticalBorder: { borderColor: '#dc3545', borderLeftWidth: 5 },
    warningBorder: { borderColor: '#ffc107', borderLeftWidth: 5 },
    alertType: { fontSize: 12, fontWeight: 'bold', color: '#666', marginBottom: 5 },
    alertMessage: { fontSize: 16, color: '#333' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    refreshButton: { margin: 20, backgroundColor: '#6c757d', padding: 15, borderRadius: 8, alignItems: 'center' },
    refreshText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default DashboardScreen;
