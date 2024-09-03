#!/bin/bash

echo -e '\033[1;44m INFO \033[0m git push origin...'
git push origin

echo -e '\033[1;44m INFO \033[0m git push github...'
git push github

echo -e '\033[1;42;37m DONE \033[0m push successful'
