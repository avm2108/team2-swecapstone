//
//  RequestView.swift
//  Scooper
//
//  Created by Ryheem Heard on 12/2/23.
//

import SwiftUI

struct RequestView: View {
    
    
    var body: some View {
        List {
            HStack(alignment: .firstTextBaseline, spacing: 30) {
                VStack {
                    Text("Status")
                    
                    Circle()
                        .frame(width: 5, height: 5)
                        .foregroundStyle(.green)
                }
                
                
                VStack {
                    Text("Student")
                    
                    HStack {
                        Text("Bryan Kim")
                    }
                }
                
                
                VStack {
                    Text("Release Date")
                    Text("10/16/2023")
                }
            }
        }
    }
}

#Preview {
    RequestView()
}
