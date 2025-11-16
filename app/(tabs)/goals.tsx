import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Target, Calendar, DollarSign, X } from 'lucide-react-native';

export default function GoalsScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    emoji: '🎯',
  });

  const goals = [
    {
      id: 1,
      title: 'Nouvel iPhone 15',
      target: 1200,
      current: 750,
      emoji: '📱',
      deadline: '2025-06-01',
      color: '#8B5CF6',
    },
    {
      id: 2,
      title: 'Vacances d\'été',
      target: 3000,
      current: 1850,
      emoji: '🏖️',
      deadline: '2025-07-15',
      color: '#EC4899',
    },
    {
      id: 3,
      title: 'Setup Gaming',
      target: 2500,
      current: 900,
      emoji: '🎮',
      deadline: '2025-08-30',
      color: '#10B981',
    },
    {
      id: 4,
      title: 'Fonds d\'urgence',
      target: 5000,
      current: 2100,
      emoji: '🛡️',
      deadline: '2025-12-31',
      color: '#F59E0B',
    },
  ];

  const createGoal = () => {
    if (!newGoal.title || !newGoal.target) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    setShowCreateModal(false);
    setNewGoal({ title: '', target: '', emoji: '🎯' });
    Alert.alert('Succès', 'Objectif créé avec succès !');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vos Objectifs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Objectifs Actifs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$5,600</Text>
          <Text style={styles.statLabel}>Total Épargné</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>68%</Text>
          <Text style={styles.statLabel}>Progrès Moyen</Text>
        </View>
      </View>

      {/* Goals List */}
      <ScrollView style={styles.goalsList}>
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </ScrollView>

      {/* Create Goal Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Créer un Nouvel Objectif</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X color="#9CA3AF" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.emojiSelector}>
              {['🎯', '📱', '🏖️', '🎮', '🚗', '🏠', '💍', '🎓'].map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.emojiOption,
                    newGoal.emoji === emoji && styles.emojiSelected,
                  ]}
                  onPress={() => setNewGoal({ ...newGoal, emoji })}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nom de l'objectif (ex: Nouvel iPhone)"
              placeholderTextColor="#9CA3AF"
              value={newGoal.title}
              onChangeText={(title) => setNewGoal({ ...newGoal, title })}
            />

            <TextInput
              style={styles.input}
              placeholder="Montant cible"
              placeholderTextColor="#9CA3AF"
              value={newGoal.target}
              onChangeText={(target) => setNewGoal({ ...newGoal, target })}
              keyboardType="numeric"
            />

            <Pressable
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.createButtonPressed,
              ]}
              onPress={createGoal}
            >
              <Text style={styles.createButtonText}>Créer l'Objectif</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function GoalCard({ goal }: { goal: any }) {
  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;

  return (
    <View style={[styles.goalCard, { borderLeftColor: goal.color }]}>
      <View style={styles.goalHeader}>
        <View style={styles.goalTitleRow}>
          <Text style={styles.goalEmoji}>{goal.emoji}</Text>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalDeadline}>Cible : {goal.deadline}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addMoneyButton}>
          <Plus color="#8B5CF6" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.goalProgress}>
        <View style={styles.amountRow}>
          <Text style={styles.currentAmount}>
            ${goal.current.toLocaleString()}
          </Text>
          <Text style={styles.targetAmount}>
            sur ${goal.target.toLocaleString()}
          </Text>
        </View>

        <View style={styles.progressBar}>
          <LinearGradient
            colors={[goal.color, goal.color + '80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]}
          />
        </View>

        <View style={styles.progressStats}>
          <Text style={styles.progressPercent}>{Math.round(progress)}% complété</Text>
          <Text style={styles.remainingAmount}>${remaining.toLocaleString()} restants</Text>
        </View>
      </View>

      <View style={styles.goalActions}>
        <TouchableOpacity style={styles.actionButton}>
          <DollarSign color="#10B981" size={16} />
          <Text style={styles.actionText}>Ajouter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar color="#8B5CF6" size={16} />
          <Text style={styles.actionText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  goalsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  goalDeadline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  addMoneyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalProgress: {
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  targetAmount: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  remainingAmount: {
    fontSize: 14,
    color: '#6B7280',
  },
  goalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  emojiSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  emojiOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiSelected: {
    backgroundColor: '#8B5CF6',
  },
  emojiText: {
    fontSize: 20,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    color: '#111827',
    fontSize: 16,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#7C3AED',
  },
  createButtonPressed: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
