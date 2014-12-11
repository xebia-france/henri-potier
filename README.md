# Henri Potier's server
[ ![Codeship Status for xebia-france/henri-potier](https://codeship.com/projects/2a04fea0-3be5-0132-8d91-22c2fe63a513/status?branch=master)](https://codeship.com/projects/42789)

## Description
REST Api used for the job tests in the mobile and the front foundations. This REST Api is built with Nodejs and Express, and it's deployed on Amazon Beanstalk by codeship.com.

- The codeship project page is avalaible [here](https://codeship.com/projects/42789)
- The beanstalk project page is avalaible [here](https://eu-central-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-central-1#/environment/dashboard?applicationName=henri-potier&environmentId=e-2wqarv28zm)


## Usage

The main developements are pushed on the master, if you want to deploy in production, you must merge the 'master' on the 'prod' branch. Codeship listen the pushs on the 'prod' branch, if it dectects a new commit, it trigs a build and then a deployement on the beanstalk server.
Codeship uses the "henri-potier-prod"'s credentials. This user is declared [here](https://console.aws.amazon.com/iam/home?region=eu-central-1#users/henri-potier-prod), on aws. It's a restricted user, it have only the necessary permissions to deploy on beanstalk.  
