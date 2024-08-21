//
//  AppDelegate+UAEPass.swift
//  UAEPass Sample app
//
//  Created by Luis Bouça on 05/05/2022.
//

import Foundation
import UAEPassClient

extension AppDelegate {
    
    open override func application(_ application: UIApplication, handleOpen url: URL) -> Bool {
        print("<><><><> appDelegate URL : \(url.absoluteString)")
        if url.absoluteString.contains(HandleURLScheme.externalURLSchemeSuccess()) {
            if let topViewController = UserInterfaceInfo.topViewController() {
                if let webViewController = topViewController as? UAEPassWebViewController {
                    webViewController.forceReload()
                }
            }
            return true
        } else if url.absoluteString.contains(HandleURLScheme.externalURLSchemeFail()) {
            guard let webViewController = UserInterfaceInfo.topViewController() as? UAEPassWebViewController  else { return false }
            webViewController.forceStop()
            webViewController.dismiss(animated: true)
            return false
        }
        return true
    }
    
    open override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        print("<><><><> appDelegate URL : \(url.absoluteString)")
        if url.absoluteString.contains(HandleURLScheme.externalURLSchemeSuccess()) {
            if let topViewController = UserInterfaceInfo.topViewController() {
                if let webViewController = topViewController as? UAEPassWebViewController {
                    webViewController.forceReload()
                }
            }
            return true
        } else if url.absoluteString.contains(HandleURLScheme.externalURLSchemeFail()) {
            guard let webViewController = UserInterfaceInfo.topViewController() as? UAEPassWebViewController  else { return false }
            webViewController.forceStop()
            webViewController.dismiss(animated: true)
            return false
        }
        return true
    }
}
