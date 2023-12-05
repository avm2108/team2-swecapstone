//
//  SchedulingView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/16/23.
//

import SwiftUI

struct SchedulingView: View {
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    @State var id: String?
    
    var body: some View {
        List {
            ScrollView {
                ForEach(vm.scoopRequest) { request in
                    HStack(alignment: .firstTextBaseline, spacing: 30) {
                        VStack {
                            Text("Status")
                            
                            if (request.status) {
                                Circle()
                                    .frame(width: 5, height: 5)
                                    .foregroundStyle(.green)
                            } else {
                                Circle()
                                    .frame(width: 5, height: 5)
                                    .foregroundStyle(.red)
                            }
                        }
                        
                        
                        VStack {
                            Text("Student")
                                .lineLimit(1)
                            
                            HStack {
                                Text(request.student)
                                    .lineLimit(1)
                            }
                        }
                        
                        
                        VStack {
                            Text("Release Date")
                                .lineLimit(1)
                            Text(request.date)
                                .lineLimit(1)
                        }
                        
                        Button {
                            vm.approveRequest(status: true, id: request.id)
                        } label: {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundStyle(.scooperGreen)
                        }
                        
                        Button {
                            vm.approveRequest(status: false, id: request.id)
                        } label: {
                            Image(systemName: "x.circle.fill")
                                .foregroundStyle(.red)
                        }
                    }
                }
            }
        }
        .onAppear(perform: {
            Task {
                do {
                    try await vm.getScoopRequestWithID(id: id ?? "")
                } catch {
                    print("error")
                }
            }
        })
        .onReceive(vm.$scoopRequest, perform: { newValue in
            Task {
                try await vm.getScoopRequestWithID(id: id ?? "")
            }
        })
    }
}

#Preview {
    SchedulingView()
}
