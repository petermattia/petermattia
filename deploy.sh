echo "Building blog"
echo '----------------------------'
JEKYLL_ENV=production bundle exec jekyll build

echo "Deploying blog to s3"
echo '----------------------------'
s3_website push --verbose

echo "Committing and pushing to GitHub"
echo '----------------------------'
DATE=`date '+%Y-%m-%d %H:%M:%S'`
git commit -a -m "$DATE"
git push
