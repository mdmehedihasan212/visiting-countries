import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Country from './Country';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searched, setsearched] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
            .then(res => res.json())
            .then(data => {
                setsearched(data)
                setCountries(data)
            })
    }, [])

    const handleToSerarch = text => {
        const filtered = countries.filter(country => country.name.includes(text))
        setsearched(filtered);
    }

    return (
        <View>
            <Text style={styles.header}>Countries: {searched.length}</Text>
            <TextInput
                onChangeText={handleToSerarch}
                style={styles.input}
                placeholder="Search your country..."
            ></TextInput>
            <ScrollView>
                {
                    searched.map(country => <Country
                        key={country.id}
                        country={country}
                    ></Country>)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        fontSize: 20,
        color: 'blue'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})