// StorageService_act8.js
// All AsyncStorage reads/writes live here so the UI never touches storage directly.
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notes_list';

// READ: get the saved array back from storage.
// AsyncStorage only stores strings, so we JSON.parse() the result.
export async function loadNotes() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json != null ? JSON.parse(json) : [];
}

// CREATE / UPDATE / DELETE all end here: save the full array.
// AsyncStorage only stores strings, so we JSON.stringify() the array first.
export async function saveNotes(notes) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
