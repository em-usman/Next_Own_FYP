import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, View } from "react-native";

export default function TermsAndConditionsScreen() {
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
      <ScreenHeader title="Terms & Conditions" />
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
            Terms & Conditions
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

          <SectionTitle title="1. Agreement To Terms" />
          <SectionText text="By accessing and using this app, you accept and agree to be bound by and comply with these Terms and Conditions. If you do not agree to abide by the above, please do not use this service." />

          <SectionTitle title="2. Use License" />
          <SectionText text="Permission is granted to temporarily download one copy of the materials (information or software) on our app for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Modify or copy the materials
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Use materials for any commercial purpose or for any public
              display
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Attempt to decompile or reverse engineer any software contained
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Remove any copyright or proprietary notations
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Transfer materials to another person or "mirror" materials
            </ThemedText>
          </View>

          <SectionTitle title="3. Disclaimer" />
          <SectionText text="The materials on our app are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights." />

          <SectionTitle title="4. Limitations" />
          <SectionText text="In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our app." />

          <SectionTitle title="5. Accuracy Of Materials" />
          <SectionText text="The materials appearing on our app could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our app are accurate, complete, or current. We may make changes to the materials contained on our app at any time without notice." />

          <SectionTitle title="6. Materials Disclaimer" />
          <SectionText text="We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk." />

          <SectionTitle title="7. Modifications To Terms" />
          <SectionText text="We may revise these terms of service for our app at any time without notice. By using this app, you are agreeing to be bound by the then current version of these terms of service." />

          <SectionTitle title="8. User Conduct" />
          <SectionText text="Users agree that they will not:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Post false, inaccurate, misleading, or defamatory listings
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Engage in fraud, scams, or deceptive practices
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Post illegal items or violate local laws
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Harass, threaten, or abuse other users
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Attempt to disrupt normal operation of the platform
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Share copyrighted or restricted content without permission
            </ThemedText>
          </View>

          <SectionTitle title="9. Listing And Transaction Rules" />
          <SectionText text="• Sellers must provide accurate descriptions and images of items" />
          <SectionText text="• Prices must be clearly stated and comply with local regulations" />
          <SectionText text="• Items must be legal and comply with all applicable laws" />
          <SectionText text="• Sellers agree to respond to buyer inquiries within 24 hours when possible" />
          <SectionText text="• Transactions should be conducted honestly and in good faith" />

          <SectionTitle title="10. Prohibited Items" />
          <SectionText text="The following items are prohibited:" />
          <View style={{ marginLeft: 12, gap: 6 }}>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Weapons, explosives, or dangerous items
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Illegal drugs or controlled substances
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Counterfeit or stolen items
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Adult or explicit content
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 13 }}
            >
              • Animals (except with proper documentation where legal)
            </ThemedText>
          </View>

          <SectionTitle title="11. Account Responsibility" />
          <SectionText text="You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account." />

          <SectionTitle title="12. Dispute Resolution" />
          <SectionText text="In case of disputes between users, we recommend attempting to resolve through direct communication first. If resolution cannot be reached, users may submit complaints through our Feedback system. We will review and mediate when appropriate." />

          <SectionTitle title="13. Limitation Of Liability" />
          <SectionText text="Our app is a platform to connect buyers and sellers. We are not responsible for the quality, safety, legality, or delivery of items sold. Transactions are between users at their own risk and responsibility." />

          <SectionTitle title="14. Governing Law" />
          <SectionText text="These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in Pakistan." />

          <SectionTitle title="15. Termination" />
          <SectionText text="We reserve the right to terminate or suspend your account and access to the app immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms." />

          <SectionTitle title="16. Intellectual Property Rights" />
          <SectionText text="The materials on our app, including all content, are the property of our company or used with permission. You are not granted any rights in this material. Any unauthorized use may violate copyright, trademark, and other laws." />

          <SectionTitle title="17. Contact Information" />
          <SectionText text="For questions about these Terms and Conditions, please contact us through the Feedback section in the app." />

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
              Legal Acknowledgment
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
              By using this app, you acknowledge that you have read, understood,
              and agree to be bound by these Terms and Conditions.
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
