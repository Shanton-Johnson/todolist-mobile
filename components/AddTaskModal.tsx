// components/AddTaskModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useTaskStore } from '../stores/taskStore';

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onClose,
}) => {
  const addTask = useTaskStore((state) => state.addTask);

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPriorityVisible, setPriorityVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const taskInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => taskInputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleAdd = () => {
    if (!taskTitle.trim()) return;

    addTask({
      title: taskTitle.trim(),
      description: description.trim(),
      date: selectedDate,
      priority: selectedPriority,
    });

    setTaskTitle('');
    setDescription('');
    setSelectedDate(null);
    setSelectedPriority(null);
    onClose();
  };

  return (
    <>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        swipeDirection="down"
        onSwipeComplete={onClose}
        style={styles.modal}
        customBackdrop={
          <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        }
        avoidKeyboard
      >
        <View style={styles.modalContainer}>
          <View style={styles.swipeIndicator} />
          <Text style={styles.modalTitle}>Add Task</Text>

          <TextInput
            ref={taskInputRef}
            style={styles.input}
            placeholder="Task title"
            placeholderTextColor="#aaa"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor="#aaa"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
              <Ionicons name="time-outline" size={22} color="#aaa" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPriorityVisible(true)}>
              <Ionicons
                name={selectedPriority ? 'flag' : 'flag-outline'}
                size={22}
                color={selectedPriority ? Colors.primary : '#aaa'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sendButton,
                { opacity: taskTitle.trim() ? 1 : 0.5 },
              ]}
              disabled={!taskTitle.trim()}
              onPress={handleAdd}
            >
              <Ionicons name="arrow-up-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={(date: any) => {
          setSelectedDate(date);
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
        themeVariant="dark"
        accentColor={Colors.primary}
      />

      <Modal
        isVisible={isPriorityVisible}
        onBackdropPress={() => setPriorityVisible(false)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        backdropTransitionOutTiming={0}
        style={styles.smallModal}
      >
        <View style={styles.priorityContainer}>
          <Text style={styles.priorityTitle}>Task Priority</Text>
          <View style={styles.priorityRow}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.flagBox,
                  selectedPriority === item && { backgroundColor: Colors.primary },
                ]}
                onPress={() => setSelectedPriority(item)}
              >
                <Ionicons
                  name="flag-outline"
                  size={18}
                  color={selectedPriority === item ? '#fff' : '#aaa'}
                />
                <Text
                  style={[
                    styles.flagNumber,
                    selectedPriority === item && { color: '#fff' },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setPriorityVisible(false)}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPriorityVisible(false)}
              style={styles.saveBtn}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContainer: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  swipeIndicator: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#444',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.input,
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 10,
  },
  smallModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityContainer: {
    width: 300,
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 20,
  },
  priorityTitle: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  priorityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  flagBox: {
    width: 45,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.input,
  },
  flagNumber: { color: '#aaa', fontSize: 12, marginTop: 3 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelBtn: { color: '#aaa', fontSize: 16 },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveText: { color: '#fff', fontWeight: '500' },
});

// default export to satisfy Expo Router warning
export default AddTaskModal;
