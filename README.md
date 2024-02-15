# Tripomatic Support

This is a Jekyll site hosted on GitHub Pages.

## Contributing

This repository is public and anyone can contribute by creating a pull request.

GitHub accounts with a role in this repository can also edit the source code directly on Github. 

### Editing a page

1. Navigate to the source file in the repository and click the pencil icon (top right corner) to start editing.
2. Edit the file using the Markdown syntax.
3. When done, click "Commit changes".
    - Add a message summarizing the changes (or use the provided default message).
    - Commit directly to `master` branch.
4. Repeat edits and commits as needed for other files.

Every time a file is commited to the `master` branch, the site at [support.tripomatic.com](https://support.tripomatic.com) is rebuilt. This takes about 3-5 minutes.

### Adding new pages

1. Create a new file in respective folder, create new folders as needed. (Folders that start with "_" are system folders)
2. Add content to the file using the Markdown syntax. The file should always start with the following **front matter**:

```markdown
---
title: Page Title
---
```
This automatically places the title as a heading to the page as well as in the browser tab, so do not repeat the title in the content.

3. Save the file and commit it to the `master` branch.
4. Edit the `index.markdown` file to add a link to the new page (see other links)

### Adding images

1. Upload the image to the `assets` folder (or any subfolder).
2. Add link to the image using markdown syntax in the content of the page.

```markdown
![Alt text](/assets/folder/image.jpg)
```

### Deleting pages

1. Delete the source file (.md) from the repository.
2. Delete the link to the page from the `index.markdown` file (and elsewhere if linked).

## Running the site locally

To run the site locally, you need to have Jekyll installed. 
1. Follow the guide at [jekyllrb.com](https://jekyllrb.com/docs/installation/).
2. Check out the source code from this repository. You can use [GitHub Desktop client](https://desktop.github.com).
3. Run `./run.sh` in the terminal (in the source code folder) to start the local server. This should open a local copy of the site in your default browser and update whenever you save changes to the source files.
4. Edit the files with your favorite text editor, e.g. [VS Code](https://code.visualstudio.com).
5. Commit the changes to the `master` branch as above (using GitHub Desktop or VS Code directly).
