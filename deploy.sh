echo "Building blog"
JEKYLL_ENV=production jekyll build
echo "Deploying blog to s3"
s3_website push
echo "Committing and pushing to GitHub"
DATE=`date '+%Y-%m-%d %H:%M:%S'`
git commit -a -m DATE
git push
