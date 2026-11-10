// styles_act8.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', paddingTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 16 },

  inputRow: { flexDirection: 'row', marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cancelButton: { backgroundColor: '#6B7280' },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },

  statusText: { textAlign: 'center', marginTop: 24, color: '#6B7280', fontSize: 16 },
  errorText: { color: '#DC2626', marginBottom: 8 },

  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  noteText: { flex: 1, fontSize: 16, color: '#1A1A2E' },
  actionButton: { marginLeft: 12 },
  editText: { color: '#4F46E5', fontWeight: '600' },
  deleteText: { color: '#DC2626', fontWeight: '600' },
});
