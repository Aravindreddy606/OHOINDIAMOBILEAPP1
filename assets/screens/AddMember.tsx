import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchDataWithBody } from '../../src/helpers/externalapi';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const AddMember = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [insuranceProvider, setInsuranceProvider] = useState('');
    const [startDate, setStartDate] = useState(null);
   
    const [vechileNumber, setVechileNumber] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state

    const onStartDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setStartDate(selectedDate);
        }
        setShowStartDatePicker(false); // Close the picker after selection
    };

    const onEndDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setEndDate(selectedDate);
        }
        setShowEndDatePicker(false); // Close the picker after selection
    };

    const handleSubmit = async () => {
        setLoading(true);  // Set loading to true before the request
        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

        try {
            const response = await fetchDataWithBody('apiLambda/VehicleInsurance/add', {
                fullName,
                mobileNumber,
                insuranceProvider,
                VechicleNo: vechileNumber,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                insertedDate: new Date().toISOString(),
            });
            console.log('API response:', response);

            if (response) {
                Alert.alert('Success', response.message);
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error adding member:', error);
            Alert.alert('Error', 'There was an error adding the member.');
        } finally {
            setLoading(false);  // Set loading to false after the request completes
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                maxLength={10}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
            />
         <Text style={styles.label}>Insurance Provider</Text>
 <TextInput
     style={styles.input}
     placeholder="Enter Insurance Provider"
         value={insuranceProvider}
         onChangeText={ setInsuranceProvider}
 />

 <Text style={styles.label}>Vehicle Number</Text>
 <TextInput
     style={styles.input}
         placeholder="Enter Vehicle Number"
         value={ vechileNumber}
         maxLength={50}
         onChangeText={setVechileNumber}
 />

            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePicker}>
                <Text style={styles.dateText}>
                    {startDate ? startDate.toISOString().split('T')[0] : 'Select Start Date'}
                </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePicker}>
                <Text style={styles.dateText}>
                    {endDate ? endDate.toISOString().split('T')[0] : 'Select End Date'}
                </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )}

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}  
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.submitButtonText}>Add Member</Text>
                )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#007BFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    datePicker: {
        height: 50,
        justifyContent: 'center',
        borderColor: '#007BFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default AddMember;
