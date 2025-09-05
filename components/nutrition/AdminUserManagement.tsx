import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { User, UserRole } from '../../types';

interface AdminUserManagementProps {
  users: User[];
  selectedUserId: string | null;
  onUserSelect: (userId: string) => void;
  onUserDeselect: () => void;
}

export default function AdminUserManagement({ 
  users, 
  selectedUserId, 
  onUserSelect, 
  onUserDeselect 
}: AdminUserManagementProps) {
  const [showUserList, setShowUserList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedUser = users.find(user => user.id === selectedUserId);
  const clientUsers = users.filter(user => user.role === 'client');
  
  // Filter users based on search query
  const filteredUsers = clientUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId: string) => {
    onUserSelect(userId);
    setShowUserList(false);
  };

  const handleUserDeselect = () => {
    onUserDeselect();
    setShowUserList(false);
  };

  const handleCloseModal = () => {
    setShowUserList(false);
    setSearchQuery(''); // Clear search when modal closes
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={[
        styles.userItem,
        selectedUserId === item.id && styles.selectedUserItem
      ]}
      onPress={() => handleUserSelect(item.id)}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userLastActive}>
          Last active: {new Date(item.lastActive).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={Colors.gray[400]} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* User Selection Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="people" size={24} color={Colors.primary} />
          <Text style={styles.headerTitle}>User Management</Text>
        </View>
        
        {selectedUser ? (
          <TouchableOpacity 
            style={styles.selectedUserContainer}
            onPress={() => setShowUserList(true)}
          >
            <View style={styles.selectedUserInfo}>
              <Text style={styles.selectedUserName}>{selectedUser.name}</Text>
              <Text style={styles.selectedUserEmail}>{selectedUser.email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.deselectButton}
              onPress={handleUserDeselect}
            >
              <Ionicons name="close" size={16} color={Colors.gray[500]} />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.selectUserButton}
            onPress={() => setShowUserList(true)}
          >
            <Ionicons name="add" size={20} color={Colors.primary} />
            <Text style={styles.selectUserText}>Select User</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* User List Modal */}
      <Modal
        visible={showUserList}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select User</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={24} color={Colors.gray[600]} />
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={Colors.gray[400]} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search users by name or email..."
                placeholderTextColor={Colors.gray[400]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={() => setSearchQuery('')}
                >
                  <Ionicons name="close-circle" size={20} color={Colors.gray[400]} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderUserItem}
            style={styles.userList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={48} color={Colors.gray[300]} />
                <Text style={styles.emptyStateText}>
                  {searchQuery ? 'No users found' : 'No users available'}
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  {searchQuery 
                    ? 'Try adjusting your search terms'
                    : 'Users will appear here once they register'
                  }
                </Text>
              </View>
            }
          />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  header: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    marginLeft: Spacing.sm,
  },
  selectedUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  selectedUserInfo: {
    flex: 1,
  },
  selectedUserName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  selectedUserEmail: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: 2,
  },
  deselectButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  selectUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray[50],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderStyle: 'dashed',
  },
  selectUserText: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  modalTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  closeButton: {
    padding: Spacing.xs,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.gray[900],
    paddingVertical: Spacing.sm,
  },
  clearButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  selectedUserItem: {
    backgroundColor: Colors.primary[50],
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  userEmail: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: 2,
  },
  userLastActive: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[500],
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  emptyStateText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600',
    color: Colors.gray[600],
    marginTop: Spacing.md,
  },
  emptyStateSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
