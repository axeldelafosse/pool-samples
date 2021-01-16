//
//  ShareViewController.h
//  share-extension
//
//  Created by Axel Delafosse on 2/10/20.
//  Copyright © 2020 Pool. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Social/Social.h>
#import <React/RCTBridgeDelegate.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

@interface ShareViewController : UIViewController <RCTBridgeDelegate>

@property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;
@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) RCTBridge *sharedBridge;

@end
