// UpdateScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchUpdateData } from '../../src/helpers/externalapi';

const UpdateScreen = ({ route, navigation }) => {
    const { member } = route.params;

    const [fullName, setFullName] = useState(member.FullName);
    const [mobileNumber, setMobileNumber] = useState(member.MobileNumber);
    const [insuranceProvider, setInsuranceProvider] = useState(member.InsuranceProvider);
    const [vehicleNumber, setVehicleNumber] = useState(member.VechicleNo);
    const [startDate, setStartDate] = useState(new Date(member.StartDate));
    const [endDate, setEndDate] = useState(new Date(member.EndDate));
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleUpdateDetails = async () => {
        try {
            const updatedData = {
                FullName: fullName,
                MobileNumber: mobileNumber,
                InsuranceProvider: insuranceProvider,
                VechicleNo: vehicleNumber,
                StartDate: startDate.toISOString(),
                EndDate: endDate.toISOString(),
            };

            const response = await fetchUpdateData(`apiLambda/VehicleInsurance/update/${member.VehicleInsuranceId}`, updatedData);
            if (response.status) {
                Alert.alert('Success', response.message);
                navigation.goBack();
            } else {
                Alert.alert('Update Failed', response.message);
            }
        } catch (error) {
            console.error('Error updating details:', error);
            Alert.alert('Update Failed', 'An error occurred while updating details.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
            />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Insurance Provider</Text>
            <TextInput
                style={styles.input}
                value={insuranceProvider}
                onChangeText={setInsuranceProvider}
            />

            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
                style={styles.input}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
            />

            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePicker}>
                <Text>{startDate.toLocaleDateString()}</Text>
                <Icon name="calendar" size={20} color="#00ACC1" />
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowStartDatePicker(false);
                        if (selectedDate) setStartDate(selectedDate);
                    }}
                />
            )}

            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePicker}>
                <Text>{endDate.toLocaleDateString()}</Text>
                <Icon name="calendar" size={20} color="#00ACC1" />
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowEndDatePicker(false);
                        if (selectedDate) setEndDate(selectedDate);
                    }}
                />
            )}

            <TouchableOpacity onPress={handleUpdateDetails} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Update Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginTop: 15,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        marginTop: 5,
    },
    datePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    updateButton: {
        marginTop: 30,
        backgroundColor: '#00ACC1',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
    },
});

export default UpdateScreen;
