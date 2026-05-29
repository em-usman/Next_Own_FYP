import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, View } from "react-native";

export default function PrivacyPolicyScreen() {
  const theme = useTheme();

  const SectionTitle = ({ title }: { title: string }) => (
    <ThemedText
      type="smallBold"
      style={{
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
      }}
    >
      {title}
    </ThemedText>
  );

  const SectionText = ({ text }: { text: string }) => (
    <ThemedText
      type="small"
      themeColor="textSecondary"
      style={{
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 8,
      }}
    >
      {text}
    </ThemedText>
  );

  return (
    <>
      <ScreenHeader title="Privacy Policy" />
      <ThemedView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 44 }}
        >
          <ThemedText
            type="subtitle"
            style={{
              fontSize: 18,
              marginBottom: 12,
            }}
          >
            Privacy Policy
          </ThemedText>

          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={{
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            Last updated: January 2025
          </ThemedText>

          <SectionTitle title="1. Introduction" />
          <SectionText text="Welcome to our App. We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information." />

          <SectionTitle title="2. Information We Collect" />
          <SectionText text="We collect information you provide directly, such as:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Account registration details (email, password, phone)
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Profile information (name, address, profile picture)
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Listing information (title, description, images, price)
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Communications (messages, feedback, support requests)
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Payment information (processed securely)
            </ThemedText>
          </View>

          <SectionTitle title="3. Automatic Information Collection" />
          <SectionText text="When you use our app, we automatically collect certain information about your device, such as:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Device type, OS version, unique identifiers
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Usage data and app interaction patterns
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Crash logs and diagnostic information
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Location information (with your permission)
            </ThemedText>
          </View>

          <SectionTitle title="4. How We Use Your Information" />
          <SectionText text="We use collected information to:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Provide, maintain, and improve our services
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Process transactions and send confirmations
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Send promotional messages (with your consent)
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Respond to inquiries and provide customer support
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Monitor and analyze app performance
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Prevent fraud and ensure security
            </ThemedText>
          </View>

          <SectionTitle title="5. Data Sharing And Disclosure" />
          <SectionText text="We do not sell your personal information. We may share data with:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Service providers assisting with operations
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Law enforcement when required by law
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Business partners with your consent
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Other users (limited profile information for transactions)
            </ThemedText>
          </View>

          <SectionTitle title="6. Data Security" />
          <SectionText text="We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure." />

          <SectionTitle title="7. Your Rights And Choices" />
          <SectionText text="You have the right to:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Access your personal data
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Correct inaccurate information
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Request deletion of your data
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Opt-out of marketing communications
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Download your data in portable format
            </ThemedText>
          </View>

          <SectionTitle title="8. Cookies And Tracking" />
          <SectionText text="We use cookies and similar tracking technologies to enhance your experience. You can disable cookies in your browser settings, though this may affect app functionality." />

          <SectionTitle title="9. Children's Privacy" />
          <SectionText text="Our app is not intended for children under 13. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete it immediately." />

          <SectionTitle title="10. Third-Party Links" />
          <SectionText text="Our app may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies before sharing information." />

          <SectionTitle title="11. International Data Transfers" />
          <SectionText text="Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws different from your country." />

          <SectionTitle title="12. Policy Changes" />
          <SectionText text="We may update this Privacy Policy periodically. Significant changes will be communicated to you via email or through the app. Your continued use of the app constitutes acceptance of the updated policy." />

          <SectionTitle title="13. Contact Us" />
          <SectionText text="If you have questions about this Privacy Policy or our privacy practices, please contact us through the Feedback section in the app or email our support team." />

          <View
            style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: `${theme.primary}15`,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: `${theme.primary}30`,
            }}
          >
            <ThemedText type="smallBold" style={{ fontSize: 12 }}>
              Privacy Commitment
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{
                fontSize: 11,
                marginTop: 6,
                lineHeight: 18,
              }}
            >
              We are committed to transparency and protecting your privacy. We
              regularly review our practices to ensure compliance with privacy
              regulations.
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
