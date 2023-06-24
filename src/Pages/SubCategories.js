import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import CheckBox from 'react-native-check-box'
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SubCategories({ navigation, route }) {

    const category = (route.params.data);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [subCategoryies, setSubCategories] = useState([]);

    // useEffect Start
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', async () => {
            setIsLoading(true);
            setSelectedItems([]);
            setAmount(0);
            var url = 'https://dreamy-chatelet.173-214-170-234.plesk.page/api/SubCategoryApi/AppSubCategoryList?CategoryId=' + category.Id;
            await fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    setSubCategories(json.Data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                })
            return unsubscribe
        });
    }, [setSubCategories])
    console.log('SubCategories', subCategoryies)
    // useEffect End
    // Checked item handler function start

    const handleChecked = (idx, check) => {

        const newSubCat = [...subCategoryies];
        newSubCat[idx].IsCheck = !check;
        if (newSubCat[idx].IsCheck == true) {
            setSelectedItems(oldArray => [...oldArray, newSubCat[idx]]);
            setAmount(amount + newSubCat[idx].Amount)
            console.log('amount:', amount)
        }
        else {
            const remove = [...selectedItems];
            console.log(remove[idx], idx);
            if (remove[idx] != newSubCat[idx]) {
                remove.splice(remove.findIndex(id => id.Id == newSubCat[idx].Id), 1);
                setAmount(amount - newSubCat[idx].Amount);
                setSelectedItems(remove);
            }
            else {
                console.log("esle")
                remove.splice(idx, 1);
                setAmount(amount - newSubCat[idx].Amount);
                setSelectedItems(remove);
            }
        }

        setSubCategories(newSubCat);
    }
    console.log('selected Items :', selectedItems)
    console.log('amount:', amount)

    // handleAddService

    const handleAddService = () => {

        if (selectedItems.length == 0) {
            Alert.alert('Error', 'Please select any 1 service')
            return;
        }
        var SelectedCategories = {
            Category: category,
            SelectedItem: selectedItems,
            Amount: amount
        }
        let SelectedCategory = JSON.stringify(SelectedCategories);
        try {
           AsyncStorage.setItem('SelectedCategory', SelectedCategory);
          console.log(SelectedCategory)
        } catch (e) {
          console.log(e);
        }
        setSelectedItems([]);
        setAmount(0);
        navigation.navigate('AddService',{SelectedItem: SelectedCategories});
       
    }

    if (isLoading == true) {
        return (<Loader />);
    }
    return (
        <View style={[globalStyle.screenContainer, { paddingTop: 0 }]}>
            <Text style={[globalStyle.textcolorLight, { fontSize: 18 }]}>Subcategories</Text>
            <Text style={globalStyle.serviceTitle}>{category.Name}</Text>
            <FlatList
                style={{ height: '100%' }}
                data={subCategoryies}
                keyExtractor={(item) => item.Id}
                renderItem={({ item, index }) =>
                    <TouchableOpacity style={[globalStyle.subcategoriesCard, globalStyle.shadow]}
                        onPress={() => handleChecked(index, item.IsCheck)}
                    >
                        <View style={globalStyle.subCategoryInfo}>
                            <Text style={globalStyle.subCategoryTitle}>{item.Name}</Text>
                            <View style={globalStyle.costContainer} >
                                <Text style={globalStyle.textcolorLight}>+{item.Cost.toLocaleString("ur-PK")}</Text>
                                <CheckBox
                                    style={{ borderRadius: 32 }}
                                    checkedCheckBoxColor='#592D8E'
                                    uncheckedCheckBoxColor='#E5E3E9'
                                    onClick={() => handleChecked(index, item.IsCheck)}
                                    isChecked={item.IsCheck}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            ></FlatList>
            <TouchableOpacity style={[globalStyle.Theambtn, { marginVertical: 0 }]}
                onPress={() => handleAddService()}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={globalStyle.TheambtnText}>Continue</Text>
                    <Text style={globalStyle.TheambtnText}>Rs: {amount.toLocaleString("ur-PK")}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default SubCategories;