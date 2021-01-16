//
//  ShareViewController.m
//  share-extension
//
//  Created by Axel Delafosse on 2/10/20.
//  Copyright © 2020 Pool. All rights reserved.
//

#import "ShareViewController.h"
#import "RNFileShareIntent.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLog.h>

#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

@implementation ShareViewController

@synthesize window = _window;

static RCTBridge *sharedBridge;

- (void)loadView {
  // Uncomment for console output in Xcode console for release mode on device:
  // RCTSetLogThreshold(RCTLogLevelInfo - 1);

  NSExtensionItem *item = self.extensionContext.inputItems.firstObject;
  NSItemProvider *itemProvider = item.attachments.firstObject;
  [RNFileShareIntent setShareFileIntentModule_itemProvider:itemProvider];
  [RNFileShareIntent setContext: self.extensionContext];
  
  // RCTLogInfo(@"YOLO %@", itemProvider);
  // NSLog(@"YOLO: '%@'", itemProvider);

  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];

  if (sharedBridge == nil) {
    sharedBridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
  }
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:sharedBridge moduleName:@"share" initialProperties:nil];

  rootView.backgroundColor = nil;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.view = rootView;
  self.window.rootViewController = self;
  [self.window makeKeyAndVisible];
}

- (BOOL)isContentValid {
  // Do validation of contentText and/or NSExtensionContext attachments here
  return YES;
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
  // You can inject any extra modules that you would like here, more information at:
  // https://facebook.github.io/react-native/docs/native-modules-ios.html#dependency-injection
  return extraModules;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#ifdef DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
