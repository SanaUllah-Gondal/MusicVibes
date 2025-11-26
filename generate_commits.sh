#!/bin/bash

# ====================================
# Generate 1000 Commits Script
# Date Range: July 2025 to November 2025
# ====================================

echo "🚀 Starting to generate 1000 commits..."
echo "📅 Date range: July 2025 - November 2025"
echo ""

# Create a temporary file for commits
COMMIT_FILE="commit_history.txt"

# Array of commit messages
COMMIT_MESSAGES=(
    "Update music player functionality"
    "Fix CSS styling issues"
    "Add new genre support"
    "Improve playlist management"
    "Optimize JavaScript performance"
    "Update UI components"
    "Fix mobile responsiveness"
    "Add new tracks to library"
    "Improve user experience"
    "Fix volume control bug"
    "Update color scheme"
    "Add animation effects"
    "Improve navigation"
    "Fix player controls"
    "Update documentation"
    "Add genre filters"
    "Improve loading speed"
    "Fix layout issues"
    "Update footer design"
    "Add new features"
    "Refactor code structure"
    "Fix compatibility issues"
    "Update dependencies"
    "Improve accessibility"
    "Add keyboard shortcuts"
    "Fix progress bar"
    "Update theme colors"
    "Improve shuffle algorithm"
    "Add repeat functionality"
    "Fix favorite button"
    "Update track metadata"
    "Improve search feature"
    "Add playlist export"
    "Fix audio sync"
    "Update album art display"
    "Improve volume slider"
    "Add equalizer settings"
    "Fix notification system"
    "Update statistics display"
    "Improve genre cards"
    "Add dark mode enhancements"
    "Fix responsive design"
    "Update hero section"
    "Improve animations"
    "Add loading indicators"
    "Fix navigation menu"
    "Update player interface"
    "Improve track listing"
    "Add sorting options"
    "Fix timestamp display"
)

# Function to generate random date between July 1, 2025 and November 30, 2025
generate_random_date() {
    # July 1, 2025 = day 182 of year
    # November 30, 2025 = day 334 of year
    # Range: 152 days (July to November)
    
    RANDOM_DAY=$((RANDOM % 153))
    
    if [ $RANDOM_DAY -lt 31 ]; then
        # July 2025
        MONTH="07"
        DAY=$((RANDOM_DAY + 1))
    elif [ $RANDOM_DAY -lt 62 ]; then
        # August 2025
        MONTH="08"
        DAY=$((RANDOM_DAY - 30))
    elif [ $RANDOM_DAY -lt 92 ]; then
        # September 2025
        MONTH="09"
        DAY=$((RANDOM_DAY - 61))
    elif [ $RANDOM_DAY -lt 123 ]; then
        # October 2025
        MONTH="10"
        DAY=$((RANDOM_DAY - 91))
    else
        # November 2025
        MONTH="11"
        DAY=$((RANDOM_DAY - 122))
    fi
    
    # Random hour (0-23)
    HOUR=$(printf "%02d" $((RANDOM % 24)))
    
    # Random minute (0-59)
    MINUTE=$(printf "%02d" $((RANDOM % 60)))
    
    # Random second (0-59)
    SECOND=$(printf "%02d" $((RANDOM % 60)))
    
    # Format: YYYY-MM-DD HH:MM:SS
    echo "2025-${MONTH}-$(printf "%02d" $DAY) ${HOUR}:${MINUTE}:${SECOND}"
}

# Generate 1000 commits
for i in $(seq 1 1000); do
    # Get random commit message
    MESSAGE_INDEX=$((RANDOM % ${#COMMIT_MESSAGES[@]}))
    MESSAGE="${COMMIT_MESSAGES[$MESSAGE_INDEX]} #${i}"
    
    # Generate random date
    COMMIT_DATE=$(generate_random_date)
    
    # Make a small change to the commit file
    echo "Commit #${i} - ${COMMIT_DATE}" >> $COMMIT_FILE
    
    # Add the file
    git add $COMMIT_FILE
    
    # Create commit with custom date
    GIT_AUTHOR_DATE="${COMMIT_DATE}" GIT_COMMITTER_DATE="${COMMIT_DATE}" git commit -m "${MESSAGE}" --quiet
    
    # Progress indicator
    if [ $((i % 50)) -eq 0 ]; then
        echo "✅ Generated ${i}/1000 commits..."
    fi
done

echo ""
echo "🎉 Successfully generated 1000 commits!"
echo "📊 Commit history file: ${COMMIT_FILE}"
echo ""
echo "🚀 Now push to GitHub with:"
echo "   git push origin main --force"
echo ""
echo "⚠️  WARNING: This will overwrite remote history!"
echo "   Make sure this is what you want to do."