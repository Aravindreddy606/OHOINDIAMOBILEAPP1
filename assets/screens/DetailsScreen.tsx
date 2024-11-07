// DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { fetchDeleteData } from '../../src/helpers/externalapi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsScreen = ({ route, navigation }) => {
    const { member } = route.params;
    console.log('member', member);

    const handleDeleteDetails = async () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete these bank details?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Deletion Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const response = await fetchDeleteData(`apiLambda/VehicleInsurance/delete/${member.VehicleInsuranceId}`);
                            console.log('response', response);
                            Alert.alert('Success', response.message);
                            if (response.status) {
                                navigation.goBack();
                            }
                        } catch (error) {
                            console.error('Error deleting bank details:', error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };
    const handleUpdateDetails = () => {
        navigation.navigate('UpdateScreen', { member });
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}><Icon name="account" size={16} color="#424242" /> Full Name</Text>
                    <Text style={styles.value}>{member.FullName}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}><Icon name="phone" size={16} color="#424242" /> Mobile Number</Text>
                    <Text style={styles.value}>{member.MobileNumber}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}><Icon name="shield" size={16} color="#424242" /> Insurance Provider</Text>
                    <Text style={styles.value}>{member.InsuranceProvider}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}><Icon name="car" size={16} color="#424242" /> Vehicle Number</Text>
                    <Text style={styles.value}>{member.VechicleNo}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}><Icon name="calendar" size={16} color="#424242" /> Start Date</Text>
                    <Text style={styles.value}>{formatDate(member.StartDate)}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}><Icon name="calendar-end" size={16} color="#424242" /> End Date</Text>
                    <Text style={styles.value}>{formatDate(member.EndDate)}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity onPress={handleUpdateDetails} style={styles.updateButton}>
                    <Icon name="pencil" size={20} color="white" />
                    <Text style={styles.updateButtonText}>Update Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteDetails} style={styles.deleteButton}>
                    <Icon name="delete" size={20} color="white" />
                    <Text style={styles.deleteButtonText}>Delete Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5', 
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        elevation: 4, 
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        flex: 1, 
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        flex: 2, 
        textAlign: 'right', 
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    deleteButton: {
        flexDirection: 'row',
        backgroundColor: '#D32F2F', 
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '45%',
        marginLeft: 'auto'
    },
    deleteButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginLeft: 5,
    },
    updateButton: {
        flexDirection: 'row',
        backgroundColor: '#00ACC1',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '45%', 
    },
    updateButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginLeft: 5,
    },
});

export default DetailsScreen;
