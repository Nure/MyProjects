import sys
import os
# 1. Input a file name and check if it exists
user_input = None
file_path = None
while True:
    user_input = raw_input("Enter file name: ")
    if user_input.endswith(".txt"):
        if os.path.exists(user_input):

            if os.stat(user_input).st_size > 0:
                break

            else:
                print "Sorry, we can not proceed because this file is empty!"
                sys.exit()

    if user_input.lower() == "Give up!".lower():
        sys.exit()

# 2. Print the number of lines and words in the file.
def count_no_of_lines_in_file():
    user_file = open(user_input)
    lines = user_file.readlines()
    user_file.close()
    count = 0
    for line in lines:
        line.rstrip()
        count += 1
    return count

def count_no_of_words_in_file():
    user_file = open(user_input)
    words = user_file.read().split()
    user_file.close()

    return len(words)

print 'The file {} consists {} lines and {} words'.format(
    user_input, count_no_of_lines_in_file(), count_no_of_words_in_file())


# 3 Find out the mostly appeared words and print them with number of occurrences
def find_out_mostly_and_rarely_appeared_words():
    list_of_words = open(user_input).read().lower().split()
    count_words_by_occurence = {}
    for item in list_of_words:
        if item in count_words_by_occurence:
            count_words_by_occurence[item] = count_words_by_occurence.get(item) + 1
        else:
            count_words_by_occurence[item] = 1

    bigvalue = max([value for key, value in count_words_by_occurence.iteritems()])
    max_occurred_words = [key for key, value in count_words_by_occurence.iteritems() if value == bigvalue]

    smallvalue = min([value for key, value in count_words_by_occurence.iteritems()])
    min_occurred_words = [key for key, value in count_words_by_occurence.iteritems() if value == smallvalue]

    print "These words {} occured maximum {} times in your file".format(max_occurred_words, bigvalue)
    print "These words {} occured minimum {} times in your file".format(min_occurred_words, smallvalue)

find_out_mostly_and_rarely_appeared_words()