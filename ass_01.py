import sys
import os
from collections import Counter
# 1
while True:
    user_input = raw_input("Enter file name: ")
    if user_input == "assignment.txt":

        if os.stat(user_input).st_size > 0:
            break
        else:
            print "Thanks you! You can not proceed because this file is empty"
            sys.exit()
            
        
    if user_input.lower() == "Give up!".lower():
        sys.exit()

# 2 Count No of lines and words
num_lines = open(os.path.abspath(user_input), 'r').read().count('\n') + 1
print "The file 'assignment' consists", num_lines, "lines"


no_of_words = len(open(os.path.abspath(user_input), 'r').read().split())

print "The file 'assignment' consists", no_of_words, "words"

# 3 Find out the mostly appeared words and print them with number of occurrences

list_of_words = open(os.path.abspath(user_input), 'r').read().split()


words_to_count = (word for word in list_of_words if word[:1].isupper())
most_common_words = Counter(words_to_count).most_common()
print most_common_words