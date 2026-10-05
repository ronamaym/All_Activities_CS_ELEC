import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ----- Static sample data (no backend, no API) -----
const profile = {
  name: 'Rona May Payos',
  username: 'payosronamay@gmail.com',
  role: 'BS Computer Science Student',
  avatar: 'https://placehold.co/200x200/6C63FF/FFFFFF.png?text=JD',
  email: 'payosronamay@gmail.com',
  location: 'Calbayog City, Philippines',
  course: 'BS Computer Science - 3rd Year',
  about:
    'Aspiring software developer who likes building mobile apps and learning new technologies. Passionate about clean UI design and solving problems through code.',
};

const skills = ['JavaScript', 'React Native', 'Java', 'Python', 'Git', 'UI/UX'];

const stats = [
  { label: 'Projects', value: '6' },
  { label: 'Skills', value: '6' },
  { label: 'Achievements', value: '4' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Profile Header */}
        <View style={styles.headerSection}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.role}>{profile.role}</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{profile.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Course</Text>
            <Text style={styles.infoValue}>{profile.course}</Text>
          </View>
        </View>

        {/* About Me */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>{profile.about}</Text>
        </View>

        {/* Skills */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>View Portfolio</Text>
          </TouchableOpacity>
        </View>

        {/* Social / Contact Icons (text-based, no icon library needed) */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>FB</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>IG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>GH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>IN</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ----- Styles -----
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    paddingBottom: 30,
  },

  // Header
  headerSection: {
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 14,
    color: '#E0DFFF',
    marginTop: 2,
  },
  role: {
    fontSize: 14,
    color: '#F0F0FF',
    marginTop: 6,
  },

  // Generic card
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 12,
  },

  // Basic info
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888888',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    flexShrink: 1,
    textAlign: 'right',
  },

  // About
  aboutText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },

  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#EFEDFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 13,
    color: '#6C63FF',
    fontWeight: '600',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  secondaryButtonText: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 14,
  },

  // Social icons
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C63FF',
  },
});