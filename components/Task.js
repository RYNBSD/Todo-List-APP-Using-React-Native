import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Task = ({ id, task, handleDeleteTask }) => {
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <TouchableOpacity 
                style={styles.square}
                onPress={() => handleDeleteTask(id)}
            ></TouchableOpacity>
            <Text style={styles.itemText}>{task}</Text>
        </View>
        <View style={styles.circular}></View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create ({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#FA0A00',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BDF6',
        borderWidth: 2,
        borderRadius: 5
    }
});