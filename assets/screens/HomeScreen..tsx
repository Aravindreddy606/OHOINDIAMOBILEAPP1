import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { fetchDataWithBody } from '../../src/helpers/externalapi';
import { useFocusEffect } from '@react-navigation/native';

const MemberListPage = ({ navigation }) => {
    const [members, setMembers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const filteredMembers = members.filter((member) =>
        member.FullName.toLowerCase().includes(searchText.toLowerCase()) ||
        member.MobileNumber.includes(searchText)
    );

    const getAccountDetails = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetchDataWithBody('apiLambda/VehicleInsurance/all', { "skip": 0, "take": 0 });
            console.log('API response:', response);

            if (response && response.length > 0) {
                const mappedMembers = response.map(item => ({
                    id: item.VehicleInsuranceId.toString(),
                    FullName: item.FullName,
                    MobileNumber: item.MobileNumber,
                    InsuranceProvider: item.InsuranceProvider,
                    StartDate: item.StartDate,
                    EndDate: item.EndDate,
                    VehicleInsuranceId: item.VehicleInsuranceId,
                    VechicleNo: item.VechicleNo
                }));
                setMembers(mappedMembers);
            } else {
                console.log('No details available');
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getAccountDetails(); // Fetch data when screen is focused
        }, [])
    );

    const handleMemberClick = (member) => {
        navigation.navigate('DetailsScreen', { member });
    };

    const handleAddMember = (newMember) => {
        setMembers([newMember, ...members]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search member..."
                value={searchText}
                onChangeText={setSearchText}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    data={filteredMembers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleMemberClick(item)}>
                            <View style={styles.memberItem}>
                                <Text style={styles.memberName}>{item.FullName}</Text>
                                <Text style={styles.memberDetail}>Mobile: {item.MobileNumber}</Text>
                                <Text style={styles.memberDetail}>Provider: {item.InsuranceProvider}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.noDataText}>No members found</Text>}
                />
            )}

            <FloatingAction
                actions={[{
                    text: "Add Member",
                    name: "add_member",
                    color: '#4CAF50',
                }]}
                distanceToEdge={{ vertical: 20, horizontal: 20 }}
                onPressItem={(name) => {
                    if (name === 'add_member') {
                        navigation.navigate('AddMember', { onAddMember: handleAddMember });
                    }
                }}
                position="right"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    memberItem: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
        borderRadius: 8,
    },
    memberName: {
        fontSize: 18,
        color: '#333',
    },
    memberDetail: {
        fontSize: 14,
        color: '#777',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default MemberListPage;
