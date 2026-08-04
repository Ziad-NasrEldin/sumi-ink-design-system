import SwiftUI

/// Reference SwiftUI implementation of the approved Sumi-Ink dropdown contract.
public struct SumiDropdown<Label: View, Content: View>: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private let minimumMenuWidth: CGFloat
    private let label: () -> Label
    private let content: (@escaping () -> Void) -> Content
    @State private var isExpanded = false

    public init(
        minimumMenuWidth: CGFloat = 216,
        @ViewBuilder label: @escaping () -> Label,
        @ViewBuilder content: @escaping (@escaping () -> Void) -> Content
    ) {
        self.minimumMenuWidth = minimumMenuWidth
        self.label = label
        self.content = content
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: isExpanded ? 4 : 0) {
            Button {
                isExpanded.toggle()
            } label: {
                label()
                    .overlay {
                        if isExpanded {
                            Rectangle().stroke(SumiInkTokens.ink, lineWidth: 1)
                        }
                    }
            }
            .buttonStyle(.plain)
            .accessibilityAddTraits(isExpanded ? .isSelected : [])
            .accessibilityHint(isExpanded ? "Dismiss options" : "Show options")

            if isExpanded {
                VStack(spacing: 0) {
                    content { isExpanded = false }
                }
                .frame(minWidth: minimumMenuWidth, alignment: .leading)
                .background(SumiInkTokens.paper)
                .overlay { Rectangle().stroke(SumiInkTokens.ink, lineWidth: 1) }
                .transition(.opacity)
            }
        }
        .animation(reduceMotion ? nil : .easeOut(duration: SumiInkTokens.controlDuration), value: isExpanded)
    }
}

public struct SumiDropdownOption: View {
    private let title: String
    private let isSelected: Bool
    private let isDestructive: Bool
    private let action: () -> Void
    @State private var isHovering = false

    public init(
        _ title: String,
        isSelected: Bool = false,
        isDestructive: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.isSelected = isSelected
        self.isDestructive = isDestructive
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            HStack(spacing: 9) {
                Text(title)
                    .font(.system(size: 12))
                    .lineLimit(1)
                Spacer(minLength: 16)
                Text(isSelected ? "SELECTED" : "")
                    .font(.system(size: 7, weight: .medium, design: .monospaced))
                    .tracking(0.8)
            }
            .foregroundStyle(foregroundColor)
            .padding(.horizontal, 10)
            .frame(maxWidth: .infinity, minHeight: 34, alignment: .leading)
            .background(backgroundColor)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .onHover { isHovering = $0 }
        .accessibilityValue(isSelected ? "Selected" : "Not selected")
    }

    private var foregroundColor: Color {
        if isSelected { return SumiInkTokens.paper }
        if isDestructive { return SumiInkTokens.sealDeep }
        return SumiInkTokens.ink
    }

    private var backgroundColor: Color {
        if isSelected { return SumiInkTokens.ink }
        if isHovering { return isDestructive ? SumiInkTokens.sealWash : SumiInkTokens.softPaper }
        return SumiInkTokens.paper
    }
}
