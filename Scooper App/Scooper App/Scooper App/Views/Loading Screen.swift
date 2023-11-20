//
//  Loading Screen.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/16/23.
//

import SwiftUI

struct Loading_Screen: View {
    @State private var isRotating = false
    var animation: Animation {
        Animation.easeOut(duration: TimeInterval(floatLiteral: 10.0))
    }
    
    var body: some View {
        ZStack {
            Color("scooperYellow")
                .ignoresSafeArea()
            VStack {
                ZStack {
                    Image("car")
                        .resizable()
                        .frame(width: 200, height: 200, alignment: .center)
                        .rotationEffect(.degrees(isRotating ? -8 : 4))
                        .animation(Animation.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: UUID())
                        .onAppear {
                            isRotating = true
                        }
                }
            }
        }
    }
}

#Preview {
    Loading_Screen()
}
