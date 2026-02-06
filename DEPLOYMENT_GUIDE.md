# Deployment Guide for Bhargav Portfolio

This guide will help you prepare your portfolio for a repository and host it live.

## 1. Repository Preparation (GitHub)

You are about to push your code to a Git repository. Here are some tips to keep it clean:

### What NOT to upload:
- **`node_modules/`**: This folder contains thousands of dependency files. It should never be committed. It is already in your `.gitignore`.
- **`dist/`**: This is the build output folder. It is generated when you run `npm run build` and should not be version controlled. It is strictly for deployment.
- **Large Files**: Avoid committing large video or zip files (like `Bhargav_Frames.zip`) directly to git if they exceed 100MB. Git will reject them. I have added `*.zip` to your `.gitignore` to prevent accidental uploads.
- **Environment Variables**: Never commit `.env` files containing secret keys. I added `.env` to `.gitignore` as a precaution.
- **System Files**: `.DS_Store` (Mac) and `Thumbs.db` (Windows) are useless for others and should be ignored (already handled).

### Steps to Push to GitHub:
1.  Initialize git (if not already done):
    ```bash
    git init
    ```
2.  Add files:
    ```bash
    git add .
    ```
3.  Commit changes:
    ```bash
    git commit -m "Initial commit: Portfolio ready for launch"
    ```
4.  Link to your GitHub repo and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## 2. Hosting Options

Since this is a static React site (Vite), you can host it for free on several platforms.

### Option A: Vercel (Recommended for ease of use)
1.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
2.  Click **"Add New Project"**.
3.  Select your `bhargav-portfolio` repository from the list.
4.  Vercel will detect it's a **Vite** project automatically.
5.  Click **Deploy**.
6.  **Done!** Your site will be live in less than a minute.

### Option B: Netlify
1.  Go to [Netlify.com](https://netlify.com) and sign up with GitHub.
2.  Click **"Import from Git"**.
3.  Choose your repository.
4.  Ensure the build command is `npm run build` and publish directory is `dist`.
5.  Click **Deploy Site**.

### Option C: GitHub Pages
1.  Go to your repository **Settings** on GitHub.
2.  Scroll to **Pages**.
3.  Select existing `gh-pages` branch if you have a workflow set up, or use a GitHub Action for Vite deployment. (Vercel/Netlify are usually easier for React apps).

## 3. Post-Deployment Checks
- **Check all links**: Ensure standard links work.
- **Refresh pages**: Test if refreshing a sub-page (e.g., `/projects`) works. If you get a 404, you might need a `_redirects` file for Netlify or `vercel.json` for Vercel to handle client-side routing.
    - **Note**: Most modern Vercel deployments handle this out of the box for Vite.

## 4. Maintenance
- Whenever you make changes locally:
    1.  `npm run dev` to test.
    2.  `git add .`
    3.  `git commit -m "Description of changes"`
    4.  `git push`
- Your host (Vercel/Netlify) will detect the push and automatically redeploy!
