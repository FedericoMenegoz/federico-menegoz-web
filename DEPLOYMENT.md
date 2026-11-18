# GitHub → Cloudflare Pages

The website is the `dist/` directory. It needs no dependencies or build command.
This directory (`site/` on the original computer) is the Git repository root:
GitHub should contain `dist/`, `.github/`, and this file at its top level.

`.github/workflows/deploy.yml` publishes `dist/` when a commit is pushed to
`main`. You can also run **Deploy website** manually from GitHub's **Actions**
tab, selecting `main`. Other branches do not deploy to production.

## 1. Put the repository on GitHub

From this directory, authenticate with GitHub and create the remote repository:

```sh
gh auth login --hostname github.com --web --scopes workflow
gh repo create FedericoMenegoz/federicomenegoz --private --source=. --remote=origin --push
```

These commands assume the site already has a local commit. If `origin` already
exists, check it with `git remote -v` and push with `git push -u origin main`
instead of creating another repository. Use `--public` instead of `--private`
only if you want the source code publicly visible; either visibility can host
a public website through Cloudflare Pages.

The first workflow run will fail its configuration check until the Cloudflare
secrets below have been added. After setup, rerun that workflow.

## 2. Create the Cloudflare Pages project

If you already have a Pages project, use that project's name. Otherwise,
create a **Direct Upload** Pages project named `federicomenegoz`, with production
branch `main`. One way to create it from this directory is:

```sh
npx wrangler@4 login
npx wrangler@4 pages project create federicomenegoz --production-branch main
```

You can also create it in **Cloudflare → Workers & Pages → Create application →
Pages**, choosing the static asset upload option. Upload the **contents** of
`dist/` (or the existing Cloudflare ZIP) for the initial deployment.

Subsequent deployments use GitHub Actions. There is no need to enable
Cloudflare's separate Git build integration. If an existing Pages project
already has Git integration, disable its automatic builds to avoid duplicate
deployments when using this workflow.

## 3. Configure GitHub credentials

In Cloudflare, create an API token with **Account → Cloudflare Pages → Edit**,
restricted to the account containing your Pages project. Copy that account's
**Account ID** from the Cloudflare dashboard.

In the GitHub repository, open **Settings → Secrets and variables → Actions**
and add these **repository secrets**:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | The Cloudflare Pages API token |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID, not the zone ID |

The workflow defaults to project name `federicomenegoz`. If your Pages project
uses another name, add a repository **variable** (not a secret) named
`CLOUDFLARE_PAGES_PROJECT_NAME` with that name.

Keep the API token in GitHub Secrets; do not commit it or paste it into chat.
Open **Actions → Deploy website → Run workflow**, selecting `main`, after
configuring the secrets. The completed deployment should appear in the
Cloudflare Pages dashboard with its `pages.dev` URL.

## 4. Connect your domain

After the first successful deployment, open your Pages project in Cloudflare,
then **Custom domains → Set up a domain**. Enter `federicomenegoz.com` (or your
actual domain), and follow the DNS confirmation. For an apex domain, the domain
must be in the same Cloudflare account as the Pages project.

Add `www.federicomenegoz.com` separately if you want it to serve the site too.
Wait until Cloudflare shows the domain as active and HTTPS works. Associate each
hostname in Pages before creating DNS records manually.

## Updating the site

Edit files in `dist/`, preview them locally, then commit and push:

```sh
python3 -m http.server 8000 --directory dist
# After previewing at http://localhost:8000, stop the server with Ctrl+C.
git add dist
git commit -m "Update website"
git push origin main
```

GitHub Actions checks JavaScript syntax and publishes the HTML, CSS, JavaScript,
and MP3 files together. Only `dist/` is uploaded; original WAV files and local
credentials are ignored by Git. To restore an earlier website version, revert
the relevant commit and push to `main` again.

References: [Cloudflare Pages with GitHub Actions](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/),
[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/),
[custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
