import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1E21',
  },
  subtitle: {
    fontSize: 14,
    color: '#65676B',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E2E8',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4C6EF5',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonDisabled: {
    backgroundColor: '#AEB8F7',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#4C6EF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkCircleFilled: {
    backgroundColor: '#4C6EF5',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  taskText: {
    fontSize: 16,
    color: '#1C1E21',
    flexShrink: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9AA0A6',
  },
  deleteButton: {
    backgroundColor: '#FDEDEE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#E03131',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#65676B',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9AA0A6',
    marginTop: 6,
  },
});