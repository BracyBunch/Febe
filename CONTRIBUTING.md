# Contributing

## General Workflow

- Fork Febe to your own Github
- Clone your fork to your local machine
- "git remote add upstream https://github.com/BracyBunch/Febe.git" to add main repo as upstream.
- git checkout -b FEATURE_BRANCH to create a feature branch (optional)
- Edit files, etc. Add and commit. Use proper commit style. (Found in contributing.md

1. Prefix each commit like so: 
1. [feat] Add a new feature
1. [fix] Fix inconsistent tests [Fixes #0]
1. [refactor] Refactor landing page
1. [cleanup] Remove comments
1. [test] Add social feed tests
1. [doc] Update Readme

- git pull --rebase upstream dev to update your local to the most recent official commit
- git push origin FEATURE_BRANCH or dev 
- make pull request to official dev branch through Github 
1. BracyBunch::Dev >> YourFork:: FEATURE_BRANCH or dev

1. Scrum master then pulls code into local and manually merges. Tests.

1. After a merge, all devs must "git pull upstream dev".  I will attempt to send out reminders after merging.

## Detailed Workflow

### Fork the repo

Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/BracyBunch/Febe.git
```

### Cut a namespaced feature branch from master, if necessary

Your branch should follow this naming convention:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

These commands will help you do this:

``` bash

# Creates your branch and brings you there
git checkout -b `your-branch-name`
```

### Make commits to your feature branch. 

Prefix each commit like so: 
[feat] Add a new feature
[fix] Fix inconsistent tests [Fixes #0]
[refactor] Refactor landing page
[cleanup] ...
[test] Add Instagram feed tests
[doc] Update Readme

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[style guide]: https://github.com/makersquare-labs/style-guide
[n-queens]: https://github.com/makersquare-labs/n-queens
[Underbar]: https://github.com/makersquare-labs/underbar
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[Bookstrap]: https://github.com/makersquare/bookstrap
[Taser]: https://github.com/makersquare/bookstrap
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
