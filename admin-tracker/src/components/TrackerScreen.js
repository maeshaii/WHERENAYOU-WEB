import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TrackerScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top navigation bar */}
      <View style={styles.navBar}>
        <Text style={styles.formTitle}>Untitled Form</Text>
        <View style={styles.navTabs}>
          <Text style={styles.activeTab}>Questions</Text>
          <Text style={styles.tab}>Responses</Text>
          <Text style={styles.tab}>Settings</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Form Description Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Form Description</Text>
          <Text style={styles.cardText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
          </Text>
        </View>

        {/* Add Question + Category Buttons */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-circle-outline" size={24} color="#555" />
            <Text>Add Question</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-circle-outline" size={24} color="#555" />
            <Text>Add Category</Text>
          </TouchableOpacity>
        </View>

        {/* Question Cards */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Question 1</Text>
          <Text>No. of Response</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Question 1</Text>
          <Text>No. of Response</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9DCE3',
  },
  navBar: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navTabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    marginRight: 20,
    color: '#777',
  },
  activeTab: {
    marginRight: 20,
    color: '#2D4E85',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    marginTop: 8,
    color: '#444',
  },
  floatingButtons: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
});
