init:
	yarn install

build-web:
	yarn install
	npx expo build:web

dev:
	yarn install
	npx expo start --web

ios:
	yarn install
	npx expo start --ios

android:
	yarn install
	npx expo start --android

purge:
	npx expo r -c